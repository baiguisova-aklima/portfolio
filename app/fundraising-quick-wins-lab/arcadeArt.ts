import { ARCADE_TEXT, SHOOTING_TARGETS } from './gameData';
import { RIDE_DISTANCE, TARGET_HP, shootingTarget, type ArcadeState } from './arcade';
type Ctx = CanvasRenderingContext2D;
type Sprites = { hero: (x:number,y:number,moving?:boolean,facing?:string)=>void; eva:(x:number,y:number)=>void; aklima:(x:number,y:number)=>void };
const rect=(c:Ctx,x:number,y:number,w:number,h:number,color:string)=>{c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),w,h);};
const text=(c:Ctx,value:string,x:number,y:number,size=16,color='#fff0c5')=>{c.font=`bold ${size}px monospace`;c.textAlign='center';c.fillStyle=color;c.fillText(value,x,y);};
function palm(c:Ctx,x:number,y:number){rect(c,x,y,9,83,'#845941');for(let i=-2;i<=2;i++){rect(c,x+i*16-8,y-12+Math.abs(i)*6,30,9,'#438d67');rect(c,x+i*14-5,y-16+Math.abs(i)*6,23,5,'#70ad6c');}}
function targetIcon(c:Ctx,a:ArcadeState,x:number,y:number){
  const col=SHOOTING_TARGETS[a.stage].color;
  rect(c,x-71,y-58,142,112,'#1c2c3b');rect(c,x-66,y-53,132,102,col);rect(c,x-60,y-47,120,90,'#e9dfbe');
  if(a.stage===0){
    for(let i=0;i<6;i++)rect(c,x-43+i*6,y-35-i*4,86-i*12,5,'#ae6251');
    rect(c,x-33,y-33,66,47,'#dfb06c');rect(c,x-7,y-16,16,31,'#795447');
    rect(c,x-26,y-22,13,13,'#72a9ae');rect(c,x+16,y-22,13,13,'#72a9ae');
  }else if(a.stage===1){
    rect(c,x-27,y-40,54,58,'#73a7a0');rect(c,x-20,y-34,40,45,'#f3e9cf');
    rect(c,x-5,y-31,10,28,'#658d89');rect(c,x-14,y-22,28,10,'#658d89');
  }else if(a.stage===2){
    rect(c,x-41,y-34,82,49,'#957bb2');rect(c,x-33,y-27,27,30,'#e2c194');
    rect(c,x-28,y-25,16,8,'#d8bd7e');rect(c,x-28,y-13,16,15,'#334551');
    for(let i=0;i<3;i++)rect(c,x+4,y-25+i*11,29,3,'#ded8bd');
  }else{
    rect(c,x-42,y-35,78,53,'#d6b477');rect(c,x-35,y-42,78,52,'#fff1cd');
    for(let i=0;i<4;i++)rect(c,x-22,y-32+i*9,46-i%2*12,3,'#baa98d');
    if(a.hp<=TARGET_HP[3]/2)text(c,ARCADE_TEXT.paperwork,x,y-74,17,'#ffe09a');
  }
  // The yellow bullseye is the hit area; the surrounding card gives context.
  rect(c,x-25,y-5,50,40,'#7b665a');rect(c,x-20,y,40,30,'#f5ce66');
  rect(c,x-12,y+6,24,18,'#a5634e');rect(c,x-5,y+11,10,8,'#ffeba0');
}
export function renderArcade(c:Ctx,a:ArcadeState,t:number,sprites:Sprites){
  if(a.kind==='chase'){
    if(a.result&&!a.result.won){rect(c,417,370,39,9,'#815632');rect(c,429,363,24,17,'#936338');text(c,ARCADE_TEXT.miss,449,330,24);}
    sprites.eva(a.dog.x,a.dog.y);sprites.hero(a.x,a.y,!a.result&&a.time>0,a.x<a.dog.x?'right':'left');
    if(!a.result){text(c,a.time<1?ARCADE_TEXT.ready:ARCADE_TEXT.run,450,245,27);text(c,'▼',a.dog.x,a.dog.y-35,20,'#ffe07b');}
    if(a.result?.won){text(c,'♥',a.dog.x,a.dog.y-38,25,'#efa29a');}
    return;
  }
  if(a.kind==='ride'){
    rect(c,0,0,900,520,'#82c9c7');rect(c,0,120,900,400,'#dbbb80');
    rect(c,195,100,510,420,'#697279');rect(c,212,100,12,420,'#f1dab0');rect(c,676,100,12,420,'#f1dab0');
    const scroll=a.distance*6;
    for(let y=-80;y<560;y+=85)for(const x of [365,535])rect(c,x,y+scroll%85,5,38,'#d2cec0');
    for(let i=0;i<4;i++){const y=(i*160+scroll)%650-100;palm(c,86,y);palm(c,795,y+65);}
    rect(c,195,80,510,33,'#374f60');text(c,`${ARCADE_TEXT.sea} ↑`,450,104,23);
    for(const o of a.obstacles){
      if(o.hit){rect(c,o.x-28,o.y,56,7,'#e5c89d');continue;}
      if(o.type===0){rect(c,o.x-23,o.y+10,46,9,'#293b45');for(let i=0;i<4;i++)rect(c,o.x-6-i*4,o.y-20+i*8,12+i*8,8,i%2?'#f8dfb1':'#d98151');}
      else if(o.type===1){rect(c,o.x-23,o.y-19,46,40,'#9f724d');rect(c,o.x-19,o.y-15,38,5,'#d8a86b');rect(c,o.x-3,o.y-15,6,33,'#d8a86b');}
      else{rect(c,o.x-33,o.y-10,66,19,'#c2a174');for(let i=0;i<9;i++)rect(c,o.x-27+i*6,o.y-6+(i%3)*5,4,3,'#e2c48c');}
    }
    // Bike viewed from behind: both riders keep their established hair and clothes.
    const y=a.y+(a.flash>0&&t!==0?Math.sin(t/35)*2:0);
    rect(c,a.x-12,y-48,24,82,'#292f3a');rect(c,a.x-18,y-21,36,43,'#be574f');
    rect(c,a.x-28,y-36,56,5,'#d4d5bd');sprites.hero(a.x,y-19,false,'up');sprites.aklima(a.x,y+6);
    rect(c,a.x-8,y+27,16,5,'#ffd585');
    if(a.flash>0)text(c,ARCADE_TEXT.miss,a.x+54,y-17,17,'#ffe0a0');
    if(a.distance>RIDE_DISTANCE-70){rect(c,240,140,420,7,'#f2e9c6');for(let i=0;i<21;i++)rect(c,240+i*20,140,10,7,'#293943');}
    return;
  }
  // A compact arcade range overlooking Barcelona.
  rect(c,0,0,900,520,'#477b98');
  for(let i=0;i<11;i++){
    const x=i*89,y=134-i%3*19;rect(c,x,y,79,110,'#b99d84');rect(c,x-2,y-5,83,6,'#dec49e');
    for(let j=0;j<3;j++)rect(c,x+10+j*22,y+15,11,19,'#f1cd8c');
  }
  for(let i=0;i<5;i++){const x=598+i*24,h=72+(2-Math.abs(i-2))*17;rect(c,x,142-h,13,h,'#ceba94');rect(c,x+4,129-h,5,18,'#e9cf9d');}
  rect(c,30,276,840,14,'#223848');rect(c,0,290,900,230,'#5b626d');
  for(let x=60;x<900;x+=78)rect(c,x,299,3,211,'#747a7b');
  rect(c,25,465,850,7,'#d4bc8b');rect(c,25,472,850,7,'#384957');
  const target=shootingTarget(a),info=SHOOTING_TARGETS[a.stage];
  if(a.intermission>0||a.result){
    const x=target.x,y=target.y;
    rect(c,x-107,y-44,214,86,'#24483f');rect(c,x-101,y-38,202,74,'#537c60');
    text(c,info.stamp,x,y+9,30,'#e4efb5');
    if(a.stage===0){rect(c,x-9,y+62,18,18,'#efd187');rect(c,x+4,y+76,28,5,'#efd187');rect(c,x+23,y+78,5,9,'#efd187');}
    for(let i=0;i<25;i++)rect(c,x-120+(i*37)%240,y-75+(i*23+(t/25))%180,4,7,['#e4c87d','#b6d9ae','#d0bdd8'][i%3]);
  }else{
    targetIcon(c,a,target.x,target.y);
    text(c,info.name,target.x,target.y-91,19);
    const damage=TARGET_HP[a.stage]-a.hp;
    for(let i=0;i<Math.min(5,damage);i++){const dx=-44+i*18;rect(c,target.x+dx,target.y-39+(i%2)*14,3,16,'#8b6e5f');rect(c,target.x+dx+2,target.y-27+(i%2)*14,8,3,'#8b6e5f');}
    if(!target.open){
      c.strokeStyle='#9fe2eb';c.lineWidth=6;c.strokeRect(target.x-79,target.y-65,158,130);
      text(c,ARCADE_TEXT.shield,target.x,target.y+84,14,'#bfeef0');
    }else if(a.stage===1)text(c,ARCADE_TEXT.open,target.x,target.y+84,14,'#d3eeab');
    if(a.flash>0){c.strokeStyle='#fff3b7';c.lineWidth=4;c.strokeRect(target.x-33,target.y-13,66,59);}
    if(a.blocked>0)text(c,'✦',target.x,target.y+37,30,'#bcecff');
  }
  for(const b of a.bullets){rect(c,b.x-2,b.y-12,4,19,'#ffe990');rect(c,b.x-4,b.y,8,4,'#dba45f');}
  sprites.hero(a.x,a.y,false,'up');
  rect(c,a.x-5,a.y-43,10,25,'#323c4e');rect(c,a.x-3,a.y-47,6,10,'#a8c4c4');
  if(a.cooldown>.13){rect(c,a.x-7,a.y-56,14,6,'#ffe58e');rect(c,a.x-2,a.y-61,4,18,'#fff4bf');}
}
