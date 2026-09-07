'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { DIALOG, GAME_TEXT, OBJECTIVES } from './gameData';
import styles from './page.module.css';
import { renderGame } from './gameArt';

const W = 900, H = 520, PLAYER_SPEED = 190;
type Mode = 'start' | 'intro' | 'playing' | 'dialog' | 'transition' | 'ending' | 'fetch' | 'final';
type Point = { x: number; y: number };
type Target = Point & { label: string; key: string };
const STARTS: Point[] = [{x:130,y:390},{x:130,y:390},{x:120,y:400},{x:120,y:390},{x:120,y:395},{x:180,y:390},{x:170,y:400},{x:450,y:430}];

function targetFor(scene:number,step:number):Target|null{
  if(scene===0)return step<3?{x:688,y:405,key:'plant',label:'ВЫСЫПАТЬ ЗЕМЛЮ'}:step===3?{x:302,y:375,key:'computer',label:'КАЧАТЬ SKILL TREE'}:{x:855,y:405,key:'exit',label:'УВОЛИТЬСЯ'};
  if(scene===1)return step===0?{x:620,y:350,key:'german',label:'ПОЙТИ С ГЕРМАНОМ'}:{x:445,y:340,key:'office',label:'ПИСАТЬ КОД'};
  if(scene===2)return [{x:690,y:350,key:'aklima',label:'ПОЗНАКОМИТЬСЯ'},{x:295,y:380,key:'food',label:'ПОКОРМИТЬ ЕВУ'},{x:455,y:390,key:'pet',label:'ПОГЛАДИТЬ ЕВУ'},{x:445,y:370,key:'save',label:'СПАСТИ ДИВАН'},{x:690,y:350,key:'kiss',label:'ПОДОЙТИ К АКЛИМЕ'}][Math.min(step,4)];
  if(scene===3)return step===0?{x:148,y:400,key:'bike',label:'СЕСТЬ НА БАЙК'}:{x:738,y:390,key:'shrimp',label:'СЪЕСТЬ КРЕВЕТКИ'};
  if(scene===4)return step===0?{x:510,y:405,key:'leiaJoin',label:'ПОЗНАКОМИТЬСЯ С ЛЕЕЙ'}:step===1?{x:710,y:405,key:'drakeJoin',label:'ПОЗНАКОМИТЬСЯ С ДРЕЙКОМ'}:{x:225,y:380,key:'pool',label:'СОБРАТЬ PARTY'};
  if(scene===5)return{x:620,y:370,key:'support',label:'ПОДДЕРЖАТЬ'};if(scene===6)return{x:735,y:350,key:'wedding',label:'СКАЗАТЬ «ДА»'};return null;
}
const HOME_TARGETS:Target[]=[{x:825,y:470,key:'ball',label:'БРОСИТЬ МЯЧ ДРЕЙКУ'},{x:220,y:275,key:'tv',label:'ТЕЛЕВИЗОР'},{x:180,y:320,key:'console',label:'PLAYSTATION'},{x:400,y:290,key:'guitar1',label:'ГИТАРА'},{x:448,y:290,key:'guitar2',label:'ЕЩЁ ГИТАРА'},{x:496,y:290,key:'guitar3',label:'СЕРАЯ ГИТАРА'},{x:555,y:405,key:'eva',label:'ЕВА'},{x:615,y:405,key:'drake',label:'ДРЕЙК'},{x:735,y:410,key:'leia',label:'ЛЕЯ'},{x:800,y:405,key:'osiris',label:'ОСИРИС'},{x:670,y:365,key:'sofa',label:'СЕСТЬ РЯДОМ'}];
function homeTarget(p:Point){return HOME_TARGETS.map(item=>({item,d:Math.hypot(p.x-item.x,p.y-item.y)})).sort((a,b)=>a.d-b.d)[0]?.d<62?HOME_TARGETS.map(item=>({item,d:Math.hypot(p.x-item.x,p.y-item.y)})).sort((a,b)=>a.d-b.d)[0].item:null;}

export default function CouponExperience(){
  const canvasRef=useRef<HTMLCanvasElement>(null),keys=useRef(new Set<string>()),player=useRef<Point>({...STARTS[0]}),actionLock=useRef(false),afterDialog=useRef<null|(()=>void)>(null),audio=useRef<AudioContext|null>(null);
  const stateRef=useRef({scene:0,step:0,mode:'start' as Mode});
  const nearbyRef=useRef<string|null>(null);
  const animation=useRef({started:0, action:0, facing:'down', line:''});
  const timers=useRef<ReturnType<typeof setTimeout>[]>([]);
  const later=(callback:()=>void,ms:number)=>{ timers.current.push(setTimeout(callback,ms)); };
  useEffect(()=>()=>{timers.current.forEach(clearTimeout);},[]);
  const [mode,setMode]=useState<Mode>('start'),[scene,setScene]=useState(0),[step,setStep]=useState(0),[introIndex,setIntroIndex]=useState(0),[dialog,setDialog]=useState<readonly string[]>([]),[dialogIndex,setDialogIndex]=useState(0),[muted,setMuted]=useState(false),[nearbyKey,setNearbyKey]=useState<string|null>(null);
  useEffect(()=>{stateRef.current={scene,step,mode};animation.current.started=performance.now();},[scene,step,mode]);
  useEffect(()=>{animation.current.line=dialog[dialogIndex]??'';},[dialog,dialogIndex]);
  const beep=useCallback((frequency=330,duration=.07)=>{if(muted)return;try{audio.current??=new AudioContext();const oscillator=audio.current.createOscillator(),gain=audio.current.createGain();oscillator.type='square';oscillator.frequency.value=frequency;gain.gain.value=.025;oscillator.connect(gain);gain.connect(audio.current.destination);oscillator.start();oscillator.stop(audio.current.currentTime+duration);}catch{}},[muted]);
  const showDialog=useCallback((lines:readonly string[],done?:()=>void)=>{animation.current.action=performance.now();keys.current.clear();actionLock.current=true;setDialog(lines);setDialogIndex(0);afterDialog.current=done??null;setMode('dialog');beep(440);later(()=>{actionLock.current=false;},180);},[beep]);
  const goScene=useCallback((next:number)=>{player.current={...STARTS[next]};setScene(next);setStep(0);setMode('transition');beep(180,.12);later(()=>setMode('playing'),900);},[beep]);
  const interact=useCallback(()=>{if(actionLock.current)return;const s=stateRef.current;
    if(s.mode==='start'){setMode('intro');setIntroIndex(0);beep(260);return;}
    if(s.mode==='intro'){if(introIndex<GAME_TEXT.intro.length-1){setIntroIndex(i=>i+1);beep(320);}else{setMode('transition');later(()=>setMode('playing'),900);}return;}
    if(s.mode==='dialog'){if(dialogIndex<dialog.length-1){setDialogIndex(i=>i+1);beep(500);}else{const done=afterDialog.current;afterDialog.current=null;setMode('playing');done?.();}return;}
    if(s.mode!=='playing')return;const p=player.current,target=s.scene===7?homeTarget(p):targetFor(s.scene,s.step);if(!target||Math.hypot(p.x-target.x,p.y-target.y)>66){beep(120,.05);return;}beep(620);
    if(s.scene===0){if(s.step<2)showDialog(DIALOG.dirt,()=>setStep(v=>v+1));else if(s.step===2)showDialog(DIALOG.note,()=>setStep(3));else if(s.step===3)showDialog(DIALOG.coding,()=>setStep(4));else goScene(1);}
    else if(s.scene===1){if(s.step===0)showDialog(DIALOG.german,()=>setStep(1));else showDialog(['Code. Deploy. Repeat.'],()=>goScene(2));}
    else if(s.scene===2){const flow=[DIALOG.meetAklima,DIALOG.evaFood,DIALOG.evaPet,DIALOG.evaSave,DIALOG.kiss] as const;showDialog(flow[Math.min(s.step,4)],()=>s.step===4?goScene(3):setStep(v=>v+1));}
    else if(s.scene===3){if(s.step===0)showDialog(DIALOG.bike,()=>setStep(1));else showDialog(DIALOG.shrimp,()=>goScene(4));}
    else if(s.scene===4){if(s.step===0)showDialog(DIALOG.leiaJoin,()=>setStep(1));else if(s.step===1)showDialog(DIALOG.drakeJoin,()=>setStep(2));else showDialog(DIALOG.barcelona,()=>goScene(5));}
    else if(s.scene===5)showDialog([...DIALOG.rejections,...DIALOG.support],()=>goScene(6));else if(s.scene===6)showDialog(DIALOG.wedding,()=>goScene(7));else if(target.key==='ball'){keys.current.clear();setMode('fetch');later(()=>showDialog(DIALOG.fetch),3900);}else if(target.key==='sofa'){keys.current.clear();setMode('ending');later(()=>setMode('final'),4200);beep(740,.2);}else showDialog(DIALOG[target.key as keyof typeof DIALOG]);
  },[beep,dialog,dialogIndex,goScene,introIndex,showDialog]);
  useEffect(()=>{const down=(event:KeyboardEvent)=>{const key=event.key.toLowerCase();if(['arrowup','arrowdown','arrowleft','arrowright','w','a','s','d',' ','enter'].includes(key))event.preventDefault();if(key===' '||key==='enter'){if(!event.repeat)interact();}else keys.current.add(key);};const up=(event:KeyboardEvent)=>keys.current.delete(event.key.toLowerCase());window.addEventListener('keydown',down,{passive:false});window.addEventListener('keyup',up);return()=>{window.removeEventListener('keydown',down);window.removeEventListener('keyup',up);};},[interact]);
  useEffect(()=>{
    const canvas=canvasRef.current,ctx=canvas?.getContext('2d');if(!canvas||!ctx)return;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame=0,last=performance.now();
    const clear=()=>keys.current.clear();
    window.addEventListener('blur',clear);document.addEventListener('visibilitychange',clear);
    const loop=(now:number)=>{
      const delta=Math.min((now-last)/1000,.04);last=now;const state=stateRef.current;
      let dx=0,dy=0;
      if(state.mode==='playing'){
        if(keys.current.has('a')||keys.current.has('arrowleft'))dx--;
        if(keys.current.has('d')||keys.current.has('arrowright'))dx++;
        if(keys.current.has('w')||keys.current.has('arrowup'))dy--;
        if(keys.current.has('s')||keys.current.has('arrowdown'))dy++;
        if(dx||dy){
          animation.current.facing=dx<0?'left':dx>0?'right':dy<0?'up':'down';
          const length=Math.hypot(dx,dy);
          player.current.x=Math.max(28,Math.min(W-28,player.current.x+dx/length*PLAYER_SPEED*delta));
          player.current.y=Math.max(330,Math.min(H-30,player.current.y+dy/length*PLAYER_SPEED*delta));
        }
      }
      renderGame(ctx,{...state,line:animation.current.line,elapsed:now-animation.current.started,action:now-animation.current.action,player:{...player.current,moving:!!(dx||dy)&&!reduced.matches,facing:animation.current.facing}},reduced.matches?0:now);
      const candidate=state.scene===7?homeTarget(player.current):targetFor(state.scene,state.step);
      const nearby=state.mode==='playing'&&candidate&&Math.hypot(player.current.x-candidate.x,player.current.y-candidate.y)<66?candidate:null;
      if(candidate&&state.mode==='playing'){
        const arrowY=candidate.y-93+(reduced.matches?0:Math.sin(now/220)*4);
        ctx.fillStyle='#252c38';ctx.fillRect(candidate.x-10,arrowY-2,20,20);
        ctx.fillStyle='#ffe27a';ctx.fillRect(candidate.x-3,arrowY,6,9);
        ctx.beginPath();ctx.moveTo(candidate.x-8,arrowY+8);ctx.lineTo(candidate.x+8,arrowY+8);ctx.lineTo(candidate.x,arrowY+16);ctx.fill();
      }
      if(nearby){ctx.strokeStyle='#ffe27a';ctx.lineWidth=2;ctx.strokeRect(nearby.x-24,nearby.y-42,48,62);}
      const nextKey=nearby?.key??null;if(nextKey!==nearbyRef.current){nearbyRef.current=nextKey;setNearbyKey(nextKey);}
      frame=requestAnimationFrame(loop);
    };
    frame=requestAnimationFrame(loop);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('blur',clear);document.removeEventListener('visibilitychange',clear);};
  },[]);
  const pressDirection=(key:string,pressed:boolean)=>pressed?keys.current.add(key):keys.current.delete(key);
  const restart=()=>{timers.current.forEach(clearTimeout);timers.current=[];afterDialog.current=null;actionLock.current=false;keys.current.clear();player.current={...STARTS[0]};setScene(0);setStep(0);setDialog([]);setDialogIndex(0);setIntroIndex(0);setMode('start');};
  const activeTarget=scene===7?HOME_TARGETS.find(item=>item.key===nearbyKey)??null:targetFor(scene,step);
  const objective=OBJECTIVES[scene][Math.min(step,OBJECTIVES[scene].length-1)];
  return <main className={styles.page}><div className={styles.scanlines} aria-hidden="true"/><section className={styles.gameShell} aria-label="ALEKSEI: LEVEL 38 — пиксельная игра-подарок">
    <header className={styles.topbar}><div><span>PLAYER</span><strong>ALEKSEI</strong></div><div className={styles.level}><span>LEVEL</span><strong>38</strong></div><button onClick={()=>setMuted(v=>!v)} aria-label={muted?'Включить звук':'Выключить звук'}>{muted?'SOUND OFF':'SOUND ON'}</button></header>
    <div className={styles.screen}><canvas ref={canvasRef} width={W} height={H} aria-label={`Сцена ${scene+1}: ${GAME_TEXT.scenes[scene].title}`}/>
      {mode==='start'&&<div className={styles.cover}><p className={styles.kicker}>A BIRTHDAY GAME</p><h1>{GAME_TEXT.title}</h1><p>{GAME_TEXT.subtitle}</p><button onClick={interact}>START GAME</button><small>{GAME_TEXT.controls}</small></div>}
      {mode==='intro'&&<button className={styles.cinematic} onClick={interact}><span>{GAME_TEXT.intro[introIndex].split('\n').map(part=><span key={part}>{part}</span>)}</span><small>SPACE TO CONTINUE</small></button>}
      {mode==='transition'&&<div className={styles.transitionCard}><p>{GAME_TEXT.scenes[scene].label}</p><h2>{GAME_TEXT.scenes[scene].title}</h2></div>}
      {(mode==='playing'||mode==='dialog')&&<div className={styles.mission}><span>{GAME_TEXT.scenes[scene].label} / 08</span><strong>{objective}</strong><small>Жёлтая стрелка — цель · Space / Enter или A — действие</small></div>}
      {mode==='playing'&&activeTarget&&nearbyKey&&<button className={styles.prompt} onClick={interact}><kbd>SPACE</kbd> {activeTarget.label}</button>}
      {mode==='dialog'&&<button className={styles.dialog} onClick={interact} aria-live="polite"><span>{dialog[dialogIndex]}</span><small>{dialogIndex<dialog.length-1?'SPACE / NEXT':'SPACE / CONTINUE'} ▾</small></button>}
      {mode==='final'&&<div className={styles.final}><p className={styles.complete}>LEVEL 38 COMPLETE</p><h2>MAIN QUEST STATUS:<br/><em>IN PROGRESS</em></h2><div className={styles.stats}>{GAME_TEXT.finalStats.map(stat=><span key={stat}>✓ {stat}</span>)}</div><div className={styles.letter}>{GAME_TEXT.letter.map((line,index)=><p key={index}>{line}</p>)}</div><button onClick={restart}>PLAY AGAIN</button></div>}
    </div>
    <div className={styles.mobileControls} aria-label="Экранное управление"><div className={styles.dpad}><button aria-label="Вверх" onPointerDown={(event)=>{event.currentTarget.setPointerCapture(event.pointerId);pressDirection('w',true);}} onPointerUp={()=>pressDirection('w',false)} onPointerCancel={()=>pressDirection('w',false)}>▲</button><button aria-label="Влево" onPointerDown={(event)=>{event.currentTarget.setPointerCapture(event.pointerId);pressDirection('a',true);}} onPointerUp={()=>pressDirection('a',false)} onPointerCancel={()=>pressDirection('a',false)}>◀</button><button aria-label="Вниз" onPointerDown={(event)=>{event.currentTarget.setPointerCapture(event.pointerId);pressDirection('s',true);}} onPointerUp={()=>pressDirection('s',false)} onPointerCancel={()=>pressDirection('s',false)}>▼</button><button aria-label="Вправо" onPointerDown={(event)=>{event.currentTarget.setPointerCapture(event.pointerId);pressDirection('d',true);}} onPointerUp={()=>pressDirection('d',false)} onPointerCancel={()=>pressDirection('d',false)}>▶</button></div><button className={styles.actionButton} onClick={interact}>A<small>ACTION</small></button></div>
    <footer><span>{GAME_TEXT.controls}</span><button onClick={restart}>RESTART</button></footer>
  </section></main>;
}
