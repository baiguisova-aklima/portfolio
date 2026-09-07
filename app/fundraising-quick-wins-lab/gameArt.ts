// Original code-drawn pixel art. All animation uses the supplied clock.
import { cleanerAt } from './ozersk';
type Ctx = CanvasRenderingContext2D;
export type Pose = { x: number; y: number; moving: boolean; facing: string };
export type VisualState = { scene: number; step: number; mode: string; line: string; elapsed: number; action: number; player: Pose; cleaner?: ReturnType<typeof cleanerAt> };
const ink = '#252c38';
function box(c: Ctx, x: number, y: number, w: number, h: number, color: string) {
  c.fillStyle = color; c.fillRect(Math.round(x), Math.round(y), w, h);
}
function label(c: Ctx, value: string, x: number, y: number, color = '#f3e6c4', size = 11) {
  c.fillStyle = color; c.font = `bold ${size}px monospace`; c.textAlign = 'center'; c.fillText(value, x, y);
}
function shadow(c: Ctx, x: number, y: number, w: number) { box(c, x-w/2, y, w, 4, '#20253540'); }
function windowArt(c: Ctx, x: number, y: number, w=36, h=44, night=false) {
  box(c,x-3,y-3,w+6,h+8,'#403f4b');box(c,x,y,w,h,night?'#e9bd77':'#709da8');
  box(c,x+3,y+3,w/2-5,h-6,night?'#f8dda1':'#9ac5ca');box(c,x+w/2,y,3,h,'#5b626a');box(c,x,y+h/2,w,3,'#5b626a');box(c,x-6,y+h,w+12,4,'#ddc5a0');
}
function floor(c: Ctx, color: string, wood=false) {
  box(c,0,300,900,220,color);
  for(let y=306;y<520;y+=wood?23:36){box(c,0,y,900,1,'#18233518');for(let x=(y%2)*27;x<900;x+=wood?110:60)box(c,x,y,1,wood?22:35,'#18233518');}
}
function room(c: Ctx, wall:string, ground:string) {
  box(c,40,130,820,175,wall);box(c,40,130,820,8,'#ffffff18');box(c,40,291,820,12,'#302d3d');floor(c,ground,true);
}
function desk(c:Ctx,x:number,y:number,t:number) {
  shadow(c,x+46,y+59,115);box(c,x,y,105,13,'#b78359');box(c,x,y+13,105,9,'#775a49');box(c,x+7,y+22,8,40,'#4b4543');box(c,x+88,y+22,8,40,'#4b4543');
  box(c,x+22,y-39,61,39,ink);box(c,x+27,y-34,51,28,'#163d47');box(c,x+47,y-5,10,9,ink);
  for(let i=0;i<4;i++)box(c,x+31,y-29+i*6,12+(Math.floor(t/140+i)*7)%29,2,['#7dcfa1','#d5b376','#83bfd4'][i%3]);
  box(c,x+28,y+4,48,5,'#c0b5a1');box(c,x+5,y-9,10,10,'#f5dfbb');box(c,x+15,y-6,3,4,'#f5dfbb');
}
export function flower(c:Ctx,x:number,y:number,t:number,dirt:number,spill=0) {
  shadow(c,x,y+24,68);box(c,x-24,y-12,48,7,'#d3a16c');box(c,x-20,y-5,40,25,'#9c543d');box(c,x-16,y+20,32,5,'#784434');
  box(c,x-16,y-2,9,21,'#c88354');box(c,x+12,y-2,7,21,'#784434');box(c,x-22,y-10,44,5,'#5a3c2b');
  const sway=Math.round(Math.sin(t/850)*2);box(c,x-2,y-69,4,59,'#395f43');
  for(let i=0;i<7;i++){const side=i%2?1:-1,ly=y-26-i*8,lx=x+side*8+sway;box(c,Math.min(x,lx),ly+5,12,3,'#3f7048');box(c,lx+(side<0?-18:0),ly-3,23,8,'#315e40');box(c,lx+(side<0?-15:3),ly-7,17,9,'#5d9957');box(c,lx+(side<0?-12:3),ly-5,12,2,'#90b66d');}
  for(let i=0;i<dirt*12;i++)box(c,x-49+(i*13)%39,y+20+(i*7)%10,3+i%3,2,'#6f4932');
  if(spill>0&&spill<1)for(let i=0;i<16;i++)box(c,x-20-spill*30+(i%3)*4,y-8+spill*spill*38+i%5,3,3,'#795136');
}
function human(c:Ctx,x:number,y:number,t:number,shirt='#548795',hair='#49362d',moving=false,facing='down') {
  shadow(c,x,y+19,27);const stride=moving?Math.round(Math.sin(t/85)*4):0;y-=moving?Math.abs(stride)/2:Math.floor(Math.sin(t/700+x)*1.2);
  box(c,x-9,y+3,7,13+stride,'#303b4e');box(c,x+2,y+3,7,13-stride,'#303b4e');box(c,x-10,y+15+stride,9,4,ink);box(c,x+2,y+15-stride,9,4,ink);
  box(c,x-10,y-17,20,22,shirt);box(c,x-7,y-14,5,17,'#ffffff1c');box(c,x+6,y-14,4,18,'#00000020');
  box(c,x-13,y-14-stride,4,15,'#d9a17b');box(c,x+9,y-14+stride,4,15,'#d9a17b');
  box(c,x-8,y-31,16,15,'#e6b48c');box(c,x-9,y-34,18,7,hair);box(c,x-9,y-28,3,8,hair);
  if(facing==='up')box(c,x-8,y-28,16,11,hair);else {const look=facing==='left'?-3:facing==='right'?3:0;box(c,x-4+look,y-25,2,2,ink);box(c,x+3+look,y-25,2,2,ink);box(c,x-2+look,y-19,4,1,'#9c6659');}
}
function animal(c:Ctx,x:number,y:number,t:number,name:string) {
  const cat=name==='leia'||name==='osiris',color=name==='leia'?'#9296a2':name==='osiris'?'#d58c43':name==='eva'?'#916343':'#744c38';
  const bounce=cat?0:Math.round(Math.sin(t/(name==='drake'?95:190))*2);shadow(c,x,y+12,32);y+=bounce;
  box(c,x-13,y-7,26,15,color);box(c,x-10,y+6,5,6,color);box(c,x+7,y+6,5,6,color);box(c,x+8,y-14,15,14,color);
  if(cat){box(c,x+8,y-19,4,7,color);box(c,x+19,y-19,4,7,color);box(c,x-22,y-6+Math.sin(t/500)*3,11,4,color);}else{for(let i=0;i<6;i++)box(c,x-13+i*5,y-10+(i%2)*2,6,5,color);box(c,x+5,y-12,5,13,'#543d30');box(c,x-20,y-8+bounce*2,9,4,color);}
  box(c,x+17,y-10,2,name==='osiris'?1:3,ink);box(c,x+22,y-5,3,3,ink);if(name==='drake')box(c,x+7,y,7,8,'#f0e4cc');
  if(name==='osiris')label(c,'z',x-4,y-20-(t/130)%12,'#e3c39b',10);
}
function heart(c:Ctx,x:number,y:number) {box(c,x-6,y,5,5,'#f39998');box(c,x+1,y,5,5,'#f39998');box(c,x-4,y+4,8,4,'#f39998');box(c,x-2,y+8,4,3,'#f39998');}
function ball(c:Ctx,x:number,y:number) {box(c,x-5,y-7,10,14,'#c74143');box(c,x-7,y-4,14,8,'#de5350');box(c,x-4,y-5,4,3,'#ffa18b');box(c,x+2,y+3,3,3,'#9a333c');}
function bike(c:Ctx,x:number,y:number,t:number,riding=false) {
  shadow(c,x,y+22,78);for(const wheel of [-26,26]){box(c,x+wheel-9,y+7,18,18,ink);box(c,x+wheel-5,y+11,10,10,'#99a8a8');box(c,x+wheel-1,y+10,2,12,Math.floor(t/70)%2?'#d7dfca':'#586675');}
  box(c,x-26,y-3,56,13,'#c76152');box(c,x-17,y-9,29,7,ink);box(c,x+21,y-19,4,20,'#dad5bc');box(c,x+15,y-22,15,4,ink);
  if(riding){human(c,x-10,y-12,t,'#dca15e');human(c,x+7,y-14,t,'#548795',undefined,false,'right');}
}

export function renderGame(c:Ctx,s:VisualState,t:number) {
  c.imageSmoothingEnabled=false;const scene=s.scene,step=s.step,dialog=s.mode==='dialog',line=s.line;
  box(c,0,0,900,520,['#8da8b4','#40536b','#cc9a76','#86cccf','#7aaec5','#35364d','#99baa0','#3c3c53'][scene]);
  if(scene===0){
    // Snowy skyline seen above the factory cutaway.
    for(let i=0;i<6;i++){const x=20+i*90;box(c,x,174-i%2*25,73,91+i%2*25,'#697f8d');box(c,x-3,170-i%2*25,79,5,'#d8e7e8');for(let j=0;j<3;j++)windowArt(c,x+7+j*21,190-i%2*25,12,23,j===1);}
    box(c,604,110,250,153,'#586c79');box(c,630,58,29,70,'#677c86');box(c,626,55,37,7,'#a8bdc0');box(c,730,77,34,48,'#6c828b');
    for(let i=0;i<5;i++){box(c,620+i*45,165,30,46,'#8cafb2');box(c,620+i*45,165,30,4,'#c4d4c3');}
    box(c,604,228,250,10,'#cab97c');label(c,'ОЗЕРСК',450,90,'#e7efea',17);
    floor(c,'#bccbd0');box(c,380,296,440,9,'#647b83');
    for(let i=0;i<4;i++){box(c,417+i*18,338,11,45,'#85969c');box(c,417+i*18,338,3,45,'#aab9bb');}box(c,410,382,95,5,'#72868e');
    box(c,765,316,60,20,'#527581');box(c,772,320,46,4,'#8fafb2');box(c,806,377,3,48,'#9a7858');box(c,796,425,24,5,'#6c5c50');
    const tilt=s.mode==='pot'?Math.min(s.elapsed/950,1)*Math.PI*.65:step>=4?Math.PI*.65:0;
    c.save();c.translate(688,399);c.rotate(tilt);flower(c,0,0,t,tilt?0:Math.min(step+(dialog&&step<3?1:0),3),dialog&&step<3?Math.min(s.action/850,1):0);c.restore();
    if(tilt){for(let i=0;i<36;i++)box(c,640+(i*13)%44,422+(i*7)%10,3,2,'#795136');}
    if(step===4||s.mode==='pot'&&s.elapsed>850){const fall=s.mode==='pot'?Math.min((s.elapsed-850)/400,1):1;box(c,656,401+fall*24,19,10,'#f0dfb3');box(c,656,401+fall*24,19,2,'#bca57b');}
    const cleaner=s.cleaner??cleanerAt(t);human(c,cleaner.x,cleaner.y,t,'#80a5b7','#817364',cleaner.x>791&&cleaner.x<834,cleaner.facing);label(c,'УБОРЩИЦА',cleaner.x,cleaner.y+44,'#4a6070',9);
    box(c,cleaner.x+14,cleaner.y-17,3,44,'#98764f');box(c,cleaner.x+8+Math.sin(t/250)*3,cleaner.y+26,24,5,'#655b54');
    if(step>=5)desk(c,251,379,t);if(step>=6){box(c,835,323,40,111,'#496574');box(c,840,330,30,93,'#7d9d9d');label(c,'EXIT',855,367);}
    for(let i=0;i<48;i++)box(c,(i*71+t/65)%900,(i*47+t/45)%285,2+i%2,2+i%2,'#eff6eeaa');
    for(let i=0;i<6;i++)box(c,638+Math.sin(i+t/900)*6,53-((t/70+i*9)%50),12+i*2,6,'#d9e2e350');
  }else if(scene===1){
    room(c,'#bdac9a','#877970');for(let x=135;x<760;x+=125)windowArt(c,x,178,78,90);
    for(let i=0;i<65;i++)box(c,(i*89+t/8)%900,(i*37+t/3)%127,1,7,'#b0d1df80');
    desk(c,158,330,t);desk(c,395,330,t);desk(c,610,330,t);flower(c,770,372,t,0);if(s.mode!=='balcony')human(c,620,350,t,'#63778c','#805738');
    box(c,695,436,190,57,'#667988');box(c,694,490,192,5,'#bec4ba');for(let x=701;x<885;x+=19)box(c,x,464,3,27,'#b0bcb8');box(c,694,461,192,4,'#d0ccba');
    if(Math.floor(t/2400)%2===0){box(c,574,276,94,22,'#f3e9d0');label(c,'Пойдём?',621,291,'#524844',12);}
    box(c,82,413,736,3,'#c7b49b');
  }else if(scene===2){
    for(let i=0;i<8;i++){const x=i*115;box(c,x,170-i%3*20,104,115,['#c87c60','#aa6860','#d8ac7d'][i%3]);windowArt(c,x+15,185-i%3*20,26,35);windowArt(c,x+63,185-i%3*20,26,35);box(c,x-4,166-i%3*20,112,6,'#6c5049');}
    floor(c,'#af795a',true);box(c,647,262,178,8,'#493f41');for(let x=650;x<825;x+=18)box(c,x,269,4,47,'#594846');box(c,647,313,178,5,'#493f41');
    box(c,385,350,118,37,'#775364');box(c,388,343,112,15,'#a4717c');box(c,397,350,42,26,'#b68083');box(c,447,350,42,26,'#946b7c');
    box(c,277,375,37,9,'#b5c7bf');box(c,280,372,31,5,step>1?'#936443':'#e1d6b8');
    box(c,737,327,68,10,'#ce9d68');for(let i=0;i<3;i++){box(c,745+i*18,311,7,9,'#e7d9c6');box(c,748+i*18,320,1,6,'#e7d9c6');}
    human(c,690,350,t,'#dca15e','#362b2c');animal(c,step===2?455:530+Math.sin(t/800)*22,395,t,'eva');animal(c,775,389,t,'osiris');flower(c,125,373,t,0);
  }else if(scene===3){
    box(c,0,204,900,118,'#3e9fae');for(let i=0;i<25;i++)box(c,(i*63+t/80)%900,218+i%7*14+Math.sin(t/500+i)*2,34+i%3*15,3,'#c1efe38a');
    floor(c,'#e3c38a');box(c,70,388,735,43,'#b39978');for(let x=90;x<790;x+=55)box(c,x,408,28,3,'#eddbb7');
    for(const x of [72,325,807]){box(c,x,171,12,125,'#866344');for(let j=0;j<8;j++)box(c,x-3,184+j*13,16,3,'#624f3f');for(let j=-3;j<=3;j++){const sway=Math.sin(t/650+j)*3;box(c,x+j*15+sway,158+Math.abs(j)*6,28,9,'#347856');box(c,x+j*14+sway,154+Math.abs(j)*6,23,5,'#5b9e66');}}
    if(step===0)bike(c,148,400,t);box(c,703,387,72,10,'#f2e4c4');for(let i=0;i<6;i++){box(c,711+i*9,380+i%2*3,7,5,'#da8263');box(c,711+i*9,378+i%2*3,5,2,'#f9ba84');}
  }else if(scene===4){
    for(let i=0;i<10;i++){box(c,i*95,233-i%3*17,90,67+i%3*17,['#ceaa89','#d9b996','#bda68f'][i%3]);windowArt(c,i*95+21,250-i%3*17,22,29);}
    for(let i=0;i<5;i++){const x=585+i*35,h=70+(2-Math.abs(i-2))*18;box(c,x,220-h,20,h,'#ad9174');box(c,x+4,211-h,12,10,'#d4b48b');box(c,x+8,196-h,4,16,'#d4b48b');}box(c,579,218,174,75,'#b99b7b');
    floor(c,'#c19b7c');box(c,99,340,250,86,'#e6d5b6');box(c,111,351,226,63,'#4aafba');for(let i=0;i<15;i++)box(c,116+i*14,366+Math.sin(t/550+i)*9,12,2,'#bdeee3');
    box(c,35,287,830,7,'#eee0c4');for(let x=45;x<860;x+=37)box(c,x,294,4,35,'#e3d0ae');flower(c,60,390,t,0);animal(c,510,405,t,'leia');animal(c,710+Math.sin(t/350)*10,405,t,'drake');label(c,'LEIA',510,447);label(c,'DRAKE',710,447);
  }else if(scene===5||scene===7){
    room(c,'#776975','#877465');windowArt(c,65,168,90,97,true);box(c,68,220,82,2,'#f3d292');
    box(c,570,153,220,6,'#443f4b');for(let i=0;i<11;i++)box(c,581+i*18,129,10,24,['#a16f62','#73968e','#d8ba7c'][i%3]);
    flower(c,823,344,t,0);box(c,57,350,8,77,'#d8bf91');box(c,38,331,45,22,'#e6ce91');box(c,23,353,75,55,'#ffdfa512');
    if(scene===5){desk(c,563,344,t);human(c,620,395,t,'#c78d62','#362b2c');box(c,190,351,150,42,'#6e6172');box(c,196,342,138,22,'#927e8d');}
    else{box(c,84,162,271,140,ink);box(c,93,172,253,119,'#35485b');label(c,'STILL LOADING…',220,233,'#95cbbf',12);box(c,155,263,130,4,'#54606b');box(c,155,263,25+(t/60)%100,4,'#8bbab0');box(c,104,307,244,34,'#5b4d49');box(c,150,302,53,9,'#ddd7c7');
      box(c,559,332,219,61,'#3c5660');box(c,568,323,200,23,'#5b7880');for(let i=0;i<3;i++)box(c,570+i*64,349,58,30,'#4d6b75');human(c,670,347,t,'#dca15e','#362b2c');
      for(let i=0;i<3;i++){const x=400+i*48,col=['#cb9655','#a3644d','#a8b7bf'][i];box(c,x-3,209,6,82,'#5f493e');box(c,x-5,204,10,15,col);box(c,x-12,281,24,12,col);box(c,x-17,293,34,17,col);box(c,x-12,310,24,5,col);box(c,x-2,219,2,87,'#e9dcc9');box(c,x-7,295,14,4,ink);box(c,x+9,301,3,3,'#e7d9aa');}
      if(s.mode!=='ending'){animal(c,555+Math.sin(t/700)*6,405,t,'eva');if(s.mode!=='fetch')animal(c,615+Math.sin(t/260)*10,405+Math.sin(t/180)*3,t,'drake');animal(c,735,410,t,'leia');animal(c,800,405,t,'osiris');}
      if(s.mode!=='fetch'){shadow(c,825,477,20);ball(c,825,468);label(c,'ДРЕЙК · МЯЧ',825,495,'#f2d4b0',9);}
      if(Math.floor(t/1100)%3===0)label(c,'✦',504,252,'#f5dfa0',17);
    }
  }else{
    floor(c,'#7b9b70');box(c,42,175,190,113,'#a88363');box(c,31,169,211,9,'#665448');for(let x=55;x<224;x+=20)box(c,x,185,3,102,'#85694f');windowArt(c,75,193,39,42,true);
    box(c,675,234,9,145,'#eadcc2');box(c,794,234,9,145,'#eadcc2');for(let i=0;i<9;i++){const x=675+i*15,y=203+Math.abs(i-4)*7;box(c,x,y,20,9,'#eadcc2');box(c,x+3,y-5,9,9,i%2?'#ecd67d':'#faf0d0');}
    box(c,679,386,127,103,'#d5c8a3');for(let i=0;i<40;i++)box(c,(i*79)%900,310+(i*37)%190,3,4,['#ead383','#e7c3a3','#b2cb8b'][i%3]);for(let x=90;x<610;x+=83)human(c,x,385,t,'#e2c56f','#574636');human(c,735,355,t,'#efe5cf','#362b2c');
  }

  let p={...s.player};
  if(s.mode==='balcony'){
    const elapsed=s.elapsed,walkOut=Math.min(elapsed/1600,1),walkBack=Math.max(0,Math.min((elapsed-4400)/1600,1)),progress=walkOut*(1-walkBack);
    p.x+=(765-p.x)*progress;p.y+=(447-p.y)*progress;p.moving=elapsed<1600||elapsed>4400;p.facing=elapsed>4400?'up':'right';
    human(c,620+(817-620)*progress,350+(447-350)*progress,t,'#63778c','#805738',p.moving,elapsed>4400?'up':'left');
    if(elapsed>1600&&elapsed<4400){for(const x of [765,817]){box(c,x+10,432,8,2,'#e5dac2');box(c,x+18,432,2,2,'#c79565');for(let i=0;i<5;i++){const rise=((elapsed-1600)/35+i*9)%43;box(c,x+18+Math.sin(rise/8)*5,427-rise,4+i%2*2,3,'#e3e3dc70');}}}
  }
  if(s.mode==='note'){p.moving=false;if(s.elapsed>800)label(c,'…',p.x,p.y-47,'#fff3ce',22);if(s.elapsed>1100&&s.elapsed<1900)box(c,p.x+18,p.y-5+(s.elapsed-1100)/20,3,3,'#795136');}
  if(s.mode==='fetch'){
    const e=s.elapsed,landing={x:420,y:460};
    const chase=Math.max(0,Math.min((e-350)/1250,1)),back=Math.max(0,Math.min((e-1900)/1600,1));
    let dogX=615+(landing.x-615)*chase,dogY=405+(landing.y-405)*chase;
    if(e>=1900){dogX=landing.x+(p.x-25-landing.x)*back;dogY=landing.y+(p.y-landing.y)*back;}
    animal(c,dogX,dogY,t,'drake');
    if(e<1000){const q=e/1000,x=p.x+(landing.x-p.x)*q,y=p.y-18+(landing.y-p.y+18)*q;shadow(c,x,landing.y+8,18);ball(c,x,y-Math.sin(q*Math.PI)*65);}
    else if(e<1700)ball(c,landing.x,landing.y-Math.abs(Math.sin((e-1000)/700*Math.PI*2))*12*(1-(e-1000)/700));
    else ball(c,dogX+23,dogY-3);
    if(back===1)heart(c,dogX,dogY-35);
  }
  if(dialog&&((scene===2&&step===4)||(scene===5&&s.action>500))){const x=scene===2?678:608,y=scene===2?350:395;p.x=x;p.y=y;box(c,x-3,y-10,31,5,'#e3b08a');heart(c,x+13,y-49-Math.sin(t/250)*3);}
  if(s.mode==='ending'){
    const progress=Math.min(s.elapsed/1100,1);p.x=p.x+(640-p.x)*progress;p.y=p.y+(350-p.y)*progress;
    ['eva','drake','leia','osiris'].forEach((name,i)=>{const q=Math.max(0,Math.min((s.elapsed-i*450)/1700,1)),x=[200,840,110,800][i],y=[460,440,370,460][i];animal(c,x+(586+i*44-x)*q,y+(404-y)*q,t,name);});
    if(s.elapsed>2400){heart(c,655,299);box(c,93,172,253,119,'#d6bf8840');label(c,'♥',220,240,'#f4d98c',30);}
  }
  if(scene===3&&step===1&&s.mode==='playing')bike(c,p.x,p.y,t,true);else human(c,p.x,p.y,t,scene===0?'#e6e8d6':'#548795','#49362d',p.moving,p.facing);
  if(dialog){
    if(scene===0&&step===5||scene===1&&step===1)for(let i=0;i<4;i++)label(c,['HTML','CSS','JavaScript','+1 Coding'][i],300+(scene===1?140:0),325-((s.action/25+i*21)%100),'#b2efb4',12);
    if(scene===3&&step===0)bike(c,150+Math.min(s.action/2200,1)*470,358,t,true);
    if(scene===6&&s.action>250)for(let i=0;i<65;i++)box(c,(i*71+s.action/28)%900,(i*43+s.action/10)%350,3,6,['#ffe391','#edb0a2','#eaf1da'][i%3]);
    if(scene===0&&step===2&&line.includes('НАХУЙ')){box(c,641,299,94,44,'#eee1b8');label(c,'FAFO',688,327,'#705540',16);}
  }
}
