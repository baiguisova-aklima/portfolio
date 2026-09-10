'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { DIALOG, GAME_TEXT, GUEST_TEXT, OBJECTIVES, CHALLENGES, SHOOTING_TARGETS, MEDALS, ARCADE_TEXT } from './gameData';
import styles from './page.module.css';
import { cleanerAt, SPILL_DURATION, RESTORE_DURATION } from './ozersk';
import { renderGame } from './gameArt';
import { createArcade, updateArcade, cleanerResult, RIDE_DISTANCE, TARGET_HP, type ArcadeState, type ArcadeKind, type ChallengeResult } from './arcade';
import { startEndingTheme } from './soundtrack';
import { EMPTY_PROGRESS, SAVE_KEY, parseProgress, withResult, type Progress } from './gameProgress';

const W = 900, H = 520, PLAYER_SPEED = 190;
type Mode = 'start' | 'intro' | 'playing' | 'dialog' | 'transition' | 'ending' | 'fetch' | 'spill' | 'restore' | 'pot' | 'balcony' | 'note' | 'eating' | 'departure' | 'returning' | 'arcadeReady' | 'arcade' | 'arcadeResult' | 'final';
type Point = { x: number; y: number };
type Target = Point & { label: string; key: string; markerY?: number };
const STARTS: Point[] = [{x:130,y:390},{x:130,y:390},{x:120,y:400},{x:140,y:410},{x:120,y:390},{x:120,y:395},{x:180,y:390},{x:170,y:400},{x:450,y:430}];

function targetFor(scene:number,step:number):Target|null{
  if(scene===0)return step===3?{x:688,y:405,key:'pot',label:'ПЕРЕВЕРНУТЬ ГОРШОК'}:step===4?{x:665,y:425,key:'note',label:'ПРОЧИТАТЬ ЗАПИСКУ'}:step<3?{x:688,y:405,key:'plant',label:'ВЫСЫПАТЬ ЗЕМЛЮ'}:step===5?{x:302,y:375,key:'computer',label:'КАЧАТЬ SKILL TREE'}:{x:855,y:405,key:'exit',label:'УВОЛИТЬСЯ'};
  if(scene===1)return step===0?{x:620,y:350,key:'german',label:'ПОЙТИ С ГЕРМАНОМ'}:{x:445,y:340,key:'office',label:'ПИСАТЬ КОД'};
  if(scene===2)return [{x:690,y:350,key:'aklima',label:'ПОЗНАКОМИТЬСЯ'},{x:295,y:380,key:'food',label:'ПОКОРМИТЬ ЕВУ'},{x:455,y:390,key:'pet',label:'ПОГЛАДИТЬ ЕВУ'},{x:445,y:370,key:'save',label:'СПАСТИ ДИВАН'},{x:690,y:350,key:'kiss',label:'ПОДОЙТИ К АКЛИМЕ'}][Math.min(step,4)];
  if(scene===3)return [{x:300,y:380,markerY:277,key:'guests',label:'АЛЕКС · ПОЗДОРОВАТЬСЯ'},{x:440,y:395,markerY:342,key:'khinkali',label:'СЪЕСТЬ ХИНКАЛИ'},{x:670,y:380,markerY:277,key:'dad',label:'ПАПА · ПОГОВОРИТЬ'},{x:670,y:380,markerY:277,key:'factoryStory',label:'РАССКАЗАТЬ ПРО ЗАВОД'}][Math.min(step,3)];
  if(scene===4)return step===0?{x:148,y:400,key:'bike',label:'СЕСТЬ НА БАЙК'}:{x:738,y:390,key:'shrimp',label:'СЪЕСТЬ КРЕВЕТКИ'};
  if(scene===5)return step===0?null:step===1?{x:510,y:405,key:'leiaJoin',label:'ПОЗНАКОМИТЬСЯ С ЛЕЕЙ'}:step===2?{x:710,y:405,key:'drakeJoin',label:'ПОЗНАКОМИТЬСЯ С ДРЕЙКОМ'}:{x:225,y:380,key:'pool',label:'СОБРАТЬ PARTY'};
  if(scene===6)return{x:620,y:370,key:'support',label:'ПОДДЕРЖАТЬ'};if(scene===7)return{x:735,y:350,key:'wedding',label:'СКАЗАТЬ «ДА»'};return null;
}
const HOME_TARGETS:Target[]=[{x:825,y:470,key:'ball',label:'БРОСИТЬ МЯЧ ДРЕЙКУ'},{x:220,y:275,key:'tv',label:'ТЕЛЕВИЗОР'},{x:180,y:320,key:'console',label:'PLAYSTATION'},{x:400,y:290,key:'guitar1',label:'ГИТАРА'},{x:448,y:290,key:'guitar2',label:'ЕЩЁ ГИТАРА'},{x:496,y:290,key:'guitar3',label:'СЕРАЯ ГИТАРА'},{x:555,y:405,key:'eva',label:'ЕВА'},{x:615,y:405,key:'drake',label:'ДРЕЙК'},{x:735,y:410,key:'leia',label:'ЛЕЯ'},{x:800,y:405,key:'osiris',label:'ОСИРИС'},{x:670,y:365,key:'sofa',label:'СЕСТЬ РЯДОМ'}];
function homeTarget(p:Point){return HOME_TARGETS.map(item=>({item,d:Math.hypot(p.x-item.x,p.y-item.y)})).sort((a,b)=>a.d-b.d)[0]?.d<62?HOME_TARGETS.map(item=>({item,d:Math.hypot(p.x-item.x,p.y-item.y)})).sort((a,b)=>a.d-b.d)[0].item:null;}

export default function CouponExperience(){
  const canvasRef=useRef<HTMLCanvasElement>(null),keys=useRef(new Set<string>()),player=useRef<Point>({...STARTS[0]}),actionLock=useRef(false),afterDialog=useRef<null|(()=>void)>(null),audio=useRef<AudioContext|null>(null);
  const arcadeRef=useRef<ArcadeState|null>(null),fireHeld=useRef(false),firePulse=useRef(false);
  const [arcadeHud,setArcadeHud]=useState<ArcadeState|null>(null),[result,setResult]=useState<ChallengeResult|null>(null);
  const [tvOn,setTvOn]=useState(false),[endingReady,setEndingReady]=useState(false);
  const [saved,setSaved]=useState<Progress|null>(null),progressRef=useRef<Progress|null>(null);
  const cleanerStats=useRef({seconds:0,mistakes:0,lastCatch:-1000});
  const arcadeDoneRef=useRef<(value:ChallengeResult)=>void>(()=>{}),beepRef=useRef<(f?:number,d?:number)=>void>(()=>{});
  const stateRef=useRef({scene:0,step:0,mode:'start' as Mode});
  const [watching,setWatching]=useState(true),[caught,setCaught]=useState(false);
  const watchRef=useRef(true);
  const cleanerEpoch=useRef(0),cleanerOrigin=useRef(cleanerAt(0));
  const nearbyRef=useRef<string|null>(null);
  const animation=useRef({started:0, action:0, facing:'down', line:'', lineStarted:0, dialogIndex:0});
  const timers=useRef<ReturnType<typeof setTimeout>[]>([]);
  const later=(callback:()=>void,ms:number)=>{ timers.current.push(setTimeout(callback,ms)); };
  useEffect(()=>()=>{timers.current.forEach(clearTimeout);},[]);
  useEffect(()=>{try{const value=parseProgress(localStorage.getItem(SAVE_KEY));progressRef.current=value;setSaved(value);}catch{}},[]);
  const storeProgress=useCallback((value:Progress)=>{progressRef.current=value;setSaved(value);try{localStorage.setItem(SAVE_KEY,JSON.stringify(value));}catch{}},[]);
  const saveCheckpoint=useCallback((next:number,nextStep=0,completed=false)=>{
    storeProgress({...(progressRef.current??EMPTY_PROGRESS),scene:next,step:nextStep,completed});
  },[storeProgress]);
  const recordResult=useCallback((value:ChallengeResult)=>storeProgress(withResult(progressRef.current??EMPTY_PROGRESS,value)),[storeProgress]);
  const clearInput=useCallback(()=>{keys.current.clear();fireHeld.current=false;firePulse.current=false;},[]);
  const resetTransient=useCallback(()=>{
    timers.current.forEach(clearTimeout);timers.current=[];afterDialog.current=null;actionLock.current=false;
    clearInput();setTvOn(false);setEndingReady(false);arcadeRef.current=null;setArcadeHud(null);setResult(null);setDialog([]);setDialogIndex(0);setCaught(false);
  },[clearInput]);
  const [mode,setMode]=useState<Mode>('start'),[scene,setScene]=useState(0),[step,setStep]=useState(0),[introIndex,setIntroIndex]=useState(0),[dialog,setDialog]=useState<readonly string[]>([]),[dialogIndex,setDialogIndex]=useState(0),[muted,setMuted]=useState(false),[nearbyKey,setNearbyKey]=useState<string|null>(null);
  useEffect(()=>{stateRef.current={scene,step,mode};animation.current.started=performance.now();},[scene,step,mode]);
  useEffect(()=>{animation.current.line=dialog[dialogIndex]??'';animation.current.lineStarted=performance.now();animation.current.dialogIndex=dialogIndex;},[dialog,dialogIndex]);
  const beep=useCallback((frequency=330,duration=.07)=>{if(muted)return;try{audio.current??=new AudioContext();const oscillator=audio.current.createOscillator(),gain=audio.current.createGain();oscillator.type='square';oscillator.frequency.value=frequency;gain.gain.value=.025;oscillator.connect(gain);gain.connect(audio.current.destination);oscillator.start();oscillator.stop(audio.current.currentTime+duration);}catch{}},[muted]);
  const showDialog=useCallback((lines:readonly string[],done?:()=>void)=>{animation.current.action=performance.now();keys.current.clear();actionLock.current=true;setDialog(lines);setDialogIndex(0);afterDialog.current=done??null;setMode('dialog');beep(440);later(()=>{actionLock.current=false;},stateRef.current.scene===3?1100:180);},[beep]);
  useEffect(()=>{beepRef.current=beep;},[beep]);
  const musicActive=tvOn&&(mode==='ending'||mode==='final');
  useEffect(()=>{
    if(!musicActive||muted)return;
    try{audio.current??=new AudioContext();void audio.current.resume().catch(()=>{});return startEndingTheme(audio.current);}catch{}
  },[musicActive,muted]);
  const beginChallenge=useCallback((kind:ArcadeKind)=>{
    resetTransient();arcadeRef.current=createArcade(kind);setArcadeHud({...arcadeRef.current});setMode('arcadeReady');
  },[resetTransient]);
  const completeArcade=useCallback((value:ChallengeResult)=>{
    clearInput();setResult(value);setMode('arcadeResult');recordResult(value);beep(value.won?740:140,.15);
    actionLock.current=true;later(()=>{actionLock.current=false;},350);
  },[beep,clearInput,recordResult]);
  useEffect(()=>{arcadeDoneRef.current=completeArcade;},[completeArcade]);
  const goScene=useCallback((next:number)=>{clearInput();player.current={...STARTS[next]};setScene(next);setStep(0);setMode('transition');saveCheckpoint(next);beep(180,.12);},[beep,clearInput,saveCheckpoint]);
  const startNew=useCallback(()=>{
    resetTransient();cleanerEpoch.current=performance.now();
    cleanerStats.current={seconds:0,mistakes:0,lastCatch:-1000};player.current={...STARTS[0]};
    setScene(0);setStep(0);setIntroIndex(0);saveCheckpoint(0);setMode('intro');
  },[resetTransient,saveCheckpoint]);
  const resume=useCallback(()=>{
    const progress=progressRef.current;if(!progress){startNew();return;}
    resetTransient();player.current={...STARTS[progress.scene]};
    cleanerEpoch.current=performance.now();cleanerStats.current={seconds:0,mistakes:0,lastCatch:-1000};
    setScene(progress.scene);setStep(progress.step);setTvOn(progress.completed);setMode(progress.completed?'final':'transition');
  },[resetTransient,startNew]);
  const continueChallenge=useCallback(()=>{
    if(!result)return;
    if(!result.won){beginChallenge(result.id as ArcadeKind);return;}
    arcadeRef.current=null;setArcadeHud(null);setResult(null);
    if(result.id==='chase'){setMode('returning');later(()=>showDialog(DIALOG.evaSave,()=>{setStep(4);saveCheckpoint(2,4);}),3000);}
    else if(result.id==='ride'){player.current={x:710,y:410};setStep(1);saveCheckpoint(4,1);setMode('playing');}
    else{player.current={...STARTS[5]};setStep(1);saveCheckpoint(5,1);setMode('playing');}
  },[result,beginChallenge,showDialog,saveCheckpoint]);
  const interact=useCallback(()=>{if(actionLock.current)return;const s=stateRef.current;
    if(s.mode==='ending'){if(endingReady){saveCheckpoint(8,0,true);setMode('final');}return;}
    if(s.mode==='arcadeReady'){clearInput();setMode('arcade');return;}
    if(s.mode==='arcadeResult'){continueChallenge();return;}
    if(s.mode==='arcade')return;
    if(s.mode==='transition'){
      if(s.scene===5&&s.step===0)showDialog(ARCADE_TEXT.shootingIntro,()=>beginChallenge('shooting'));
      else setMode('playing');return;
    }
    if(s.mode==='note'){showDialog(DIALOG.note,()=>setStep(5));return;}
    if(s.mode==='start'){if(progressRef.current)resume();else startNew();beep(260);return;}
    if(s.mode==='intro'){if(introIndex<GAME_TEXT.intro.length-1){setIntroIndex(i=>i+1);beep(320);}else{setMode('transition');}return;}
    if(s.mode==='dialog'){
      // Give each guest line (and its animation) time to appear before another action.
      actionLock.current=true;keys.current.clear();later(()=>{actionLock.current=false;},s.scene===3&&dialogIndex<dialog.length-1?1100:180);
      if(dialogIndex<dialog.length-1){setDialogIndex(i=>i+1);beep(500);}
      else{const done=afterDialog.current;afterDialog.current=null;setMode('playing');done?.();}
      return;
    }
    if(s.mode!=='playing')return;const p=player.current,target=s.scene===8?homeTarget(p):targetFor(s.scene,s.step);if(!target||Math.hypot(p.x-target.x,p.y-target.y)>66){beep(120,.05);return;}beep(620);
    if(s.scene===0){
      if(s.step<=4&&cleanerAt(performance.now()-cleanerEpoch.current,s.step).watching){if(performance.now()-cleanerStats.current.lastCatch>1000){cleanerStats.current.mistakes++;cleanerStats.current.lastCatch=performance.now();}setCaught(true);beep(100,.15);later(()=>setCaught(false),1400);return;}
      setCaught(false);
      if(s.step<3){
        keys.current.clear();actionLock.current=true;setMode('spill');
        cleanerOrigin.current=cleanerAt(performance.now()-cleanerEpoch.current,s.step);
        later(()=>{
          setStep(s.step+1);setMode('restore');
          later(()=>{
            cleanerEpoch.current=performance.now();
            if(s.step===2){
              const score=cleanerResult(cleanerStats.current.seconds,cleanerStats.current.mistakes);
              recordResult(score);showDialog(DIALOG.daysLater);
            }
            else{setMode('playing');actionLock.current=false;}
          },RESTORE_DURATION);
        },SPILL_DURATION);
      }
      else if(s.step===3){keys.current.clear();actionLock.current=true;setMode('pot');later(()=>{setStep(4);setMode('playing');actionLock.current=false;},1400);}
      else if(s.step===4){keys.current.clear();actionLock.current=true;setMode('note');later(()=>{actionLock.current=false;},2200);}
      else if(s.step===5)showDialog(DIALOG.coding,()=>setStep(6));
      else goScene(1);
    }
    else if(s.scene===1){
      if(s.step===0)showDialog(DIALOG.german.slice(0,2),()=>{keys.current.clear();setMode('balcony');later(()=>{setStep(1);setMode('playing');},6200);});
      else showDialog(DIALOG.german.slice(3),()=>goScene(2));
    }
    else if(s.scene===2){if(s.step===3){beginChallenge('chase');return;}const flow=[DIALOG.meetAklima,DIALOG.evaFood,DIALOG.evaPet,DIALOG.evaSave,DIALOG.kiss] as const;showDialog(flow[Math.min(s.step,4)],()=>{if(s.step===4)goScene(3);else if(s.step===0){clearInput();setMode('departure');later(()=>{setStep(1);setMode('playing');},3000);}else setStep(v=>v+1);});}
    else if(s.scene===3){
      if(s.step===0)showDialog(DIALOG.guests,()=>setStep(1));
      else if(s.step===1){
        keys.current.clear();actionLock.current=true;setMode('eating');
        later(()=>showDialog(DIALOG.khinkali,()=>setStep(2)),1800);
      }
      else if(s.step===2)showDialog(DIALOG.dad,()=>setStep(3));
      else showDialog(DIALOG.factoryStory,()=>goScene(4));
    }
    else if(s.scene===4){if(s.step===0)showDialog(DIALOG.bike,()=>beginChallenge('ride'));else showDialog(DIALOG.shrimp,()=>goScene(5));}
    else if(s.scene===5){if(s.step===1)showDialog(DIALOG.leiaJoin,()=>setStep(2));else if(s.step===2)showDialog(DIALOG.drakeJoin,()=>setStep(3));else showDialog(DIALOG.barcelona,()=>goScene(6));}
    else if(s.scene===6)showDialog([...DIALOG.rejections,...DIALOG.support],()=>goScene(7));else if(s.scene===7)showDialog(DIALOG.wedding,()=>goScene(8));else if(target.key==='ball'){keys.current.clear();setMode('fetch');later(()=>showDialog(DIALOG.fetch),3900);}else if(target.key==='sofa'){keys.current.clear();setMode('ending');later(()=>setTvOn(true),3800);later(()=>setEndingReady(true),6500);beep(740,.2);}else {const lines=DIALOG[target.key as keyof typeof DIALOG];if(Array.isArray(lines))showDialog(lines);}
  },[beep,dialog,dialogIndex,goScene,introIndex,showDialog,clearInput,beginChallenge,continueChallenge,resume,startNew,recordResult,saveCheckpoint,endingReady]);
  useEffect(()=>{
    const down=(event:KeyboardEvent)=>{
      const key=event.key.toLowerCase();
      // Let focused menu buttons keep native keyboard activation.
      const mode=stateRef.current.mode;
      if((mode==='start'||mode==='arcadeResult'||mode==='final')&&(event.target as HTMLElement)?.tagName==='BUTTON')return;
      if(['arrowup','arrowdown','arrowleft','arrowright','w','a','s','d',' ','enter'].includes(key))event.preventDefault();
      if(key===' '||key==='enter'){
        if(mode==='arcade'&&arcadeRef.current?.kind==='shooting'){fireHeld.current=true;if(!event.repeat)firePulse.current=true;}
        else if(!event.repeat)interact();
      }else keys.current.add(key);
    };
    const up=(event:KeyboardEvent)=>{const key=event.key.toLowerCase();keys.current.delete(key);if(key===' '||key==='enter')fireHeld.current=false;};
    window.addEventListener('keydown',down,{passive:false});window.addEventListener('keyup',up);
    return()=>{window.removeEventListener('keydown',down);window.removeEventListener('keyup',up);};
  },[interact]);
  useEffect(()=>{
    const canvas=canvasRef.current,ctx=canvas?.getContext('2d');if(!canvas||!ctx)return;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame=0,last=performance.now(),lastHud=0;
    const clear=()=>clearInput();
    window.addEventListener('blur',clear);document.addEventListener('visibilitychange',clear);
    const loop=(now:number)=>{
      const delta=Math.min((now-last)/1000,.04);last=now;const state=stateRef.current;
      const cleaner=cleanerAt(now-cleanerEpoch.current,state.step);
      const looks=cleaner.watching;if(looks!==watchRef.current){watchRef.current=looks;setWatching(looks);}
      if(state.scene===0&&state.step<3&&['playing','spill','restore'].includes(state.mode)&&!document.hidden)cleanerStats.current.seconds+=delta;
      let dx=0,dy=0;
      if((state.mode==='playing'||state.mode==='arcade')&&!document.hidden){
        if(keys.current.has('a')||keys.current.has('arrowleft'))dx--;
        if(keys.current.has('d')||keys.current.has('arrowright'))dx++;
        if(keys.current.has('w')||keys.current.has('arrowup'))dy--;
        if(keys.current.has('s')||keys.current.has('arrowdown'))dy++;
        if((dx||dy)&&state.mode==='playing'){
          animation.current.facing=dx<0?'left':dx>0?'right':dy<0?'up':'down';
          const length=Math.hypot(dx,dy);
          player.current.x=Math.max(28,Math.min(W-28,player.current.x+dx/length*PLAYER_SPEED*delta));
          player.current.y=Math.max(330,Math.min(H-30,player.current.y+dy/length*PLAYER_SPEED*delta));
        }
      }
      const arcade=arcadeRef.current;
      if(state.mode==='arcade'&&arcade&&!document.hidden){
        const shots=arcade.shots,hits=arcade.hits,bumps=arcade.bumps;
        updateArcade(arcade,{x:dx,y:dy,fire:fireHeld.current||firePulse.current},delta);firePulse.current=false;
        player.current={x:arcade.x,y:arcade.y};
        if(arcade.hits>hits)beepRef.current(660,.035);
        else if(arcade.shots>shots)beepRef.current(220,.025);
        if(arcade.bumps>bumps)beepRef.current(110,.09);
        if(now-lastHud>100||arcade.result){setArcadeHud({...arcade});lastHud=now;}
        if(arcade.result)arcadeDoneRef.current(arcade.result);
      }
      renderGame(ctx,{...state,arcade:arcade??undefined,cleaner:state.mode==='spill'||state.mode==='restore'?cleanerOrigin.current:cleaner,line:animation.current.line,dialogIndex:animation.current.dialogIndex,lineElapsed:now-animation.current.lineStarted,elapsed:now-animation.current.started,action:now-animation.current.action,player:{...player.current,moving:!!(dx||dy)&&!reduced.matches,facing:animation.current.facing}},reduced.matches?0:now);
      const candidate=state.scene===8?homeTarget(player.current):targetFor(state.scene,state.step);
      const nearby=state.mode==='playing'&&candidate&&Math.hypot(player.current.x-candidate.x,player.current.y-candidate.y)<66?candidate:null;
      if(candidate&&state.mode==='playing'){
        const arrowY=(candidate.markerY??candidate.y)-93+(reduced.matches?0:Math.sin(now/220)*4);
        ctx.fillStyle='#252c38';ctx.fillRect(candidate.x-10,arrowY-2,20,20);
        ctx.fillStyle='#ffe27a';ctx.fillRect(candidate.x-3,arrowY,6,9);
        ctx.beginPath();ctx.moveTo(candidate.x-8,arrowY+8);ctx.lineTo(candidate.x+8,arrowY+8);ctx.lineTo(candidate.x,arrowY+16);ctx.fill();
      }
      if(nearby){ctx.strokeStyle='#ffe27a';ctx.lineWidth=2;ctx.strokeRect(nearby.x-24,(nearby.markerY??nearby.y)-42,48,62);}
      const nextKey=nearby?.key??null;if(nextKey!==nearbyRef.current){nearbyRef.current=nextKey;setNearbyKey(nextKey);}
      frame=requestAnimationFrame(loop);
    };
    frame=requestAnimationFrame(loop);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('blur',clear);document.removeEventListener('visibilitychange',clear);};
  },[clearInput]);
  const pressDirection=(key:string,pressed:boolean)=>pressed?keys.current.add(key):keys.current.delete(key);
  const restart=()=>{resetTransient();player.current={...STARTS[0]};setScene(0);setStep(0);setIntroIndex(0);setMode('start');};
  const activeChallenge=arcadeHud?.kind??'cleaner';
  const inChallenge=mode==='arcade'||mode==='arcadeReady'||mode==='arcadeResult';
  const activeTarget=scene===8?HOME_TARGETS.find(item=>item.key===nearbyKey)??null:targetFor(scene,step);
  const objective=OBJECTIVES[scene][Math.min(step,OBJECTIVES[scene].length-1)];
  return <main className={styles.page}><div className={styles.scanlines} aria-hidden="true"/><section className={`${styles.gameShell} ${inChallenge?styles.arcadeShell:''}`} aria-label="ALEKSEI: LEVEL 38 — пиксельная игра-подарок">
    <header className={styles.topbar}><div><span>PLAYER</span><strong>ALEKSEI</strong></div><div className={styles.level}><span>LEVEL</span><strong>38</strong></div><button onClick={()=>setMuted(v=>!v)} aria-label={muted?'Включить звук':'Выключить звук'}>{muted?'SOUND OFF':'SOUND ON'}</button></header>
    {mode==='arcade'&&arcadeHud&&<div className={styles.challengeHud}>
      <div><strong>{CHALLENGES[arcadeHud.kind].title}</strong><span>{Math.floor(arcadeHud.time)} с</span></div>
      <small>{CHALLENGES[arcadeHud.kind].controls}</small>
      {arcadeHud.kind==='shooting'?<>
        <div className={styles.targetChecklist}>{SHOOTING_TARGETS.map((target,index)=><span key={target.short} data-done={index<arcadeHud.stage||index===arcadeHud.stage&&arcadeHud.hp===0}>{index<arcadeHud.stage||index===arcadeHud.stage&&arcadeHud.hp===0?'✓ ':''}{target.short}</span>)}</div>
        <p>{SHOOTING_TARGETS[arcadeHud.stage].hint} · {TARGET_HP[arcadeHud.stage]-arcadeHud.hp}/{TARGET_HP[arcadeHud.stage]}</p>
      </>:arcadeHud.kind==='ride'?<><progress aria-label="Путь к морю" max={RIDE_DISTANCE} value={arcadeHud.distance}/><p>До моря: {Math.max(0,Math.ceil((RIDE_DISTANCE-arcadeHud.distance)/24))} с · Задето: {arcadeHud.bumps}</p></>:<p>Догони Еву до дивана. Приблизься, чтобы поймать!</p>}
    </div>}
    <div className={`${styles.screen} ${scene===3?styles.guestScreen:''} ${mode==='final'?styles.finalScreen:''} ${['start','arcadeReady','arcadeResult'].includes(mode)?styles.menuScreen:''}`}>
<canvas ref={canvasRef} width={W} height={H} aria-label={`Сцена ${scene+1}: ${GAME_TEXT.scenes[scene].title}`}/>
      {mode==='start'&&<div className={styles.cover}><p className={styles.kicker}>A BIRTHDAY GAME</p><h1>{GAME_TEXT.title}</h1><p>{GAME_TEXT.subtitle}</p><div className={styles.coverActions}>{saved?<><button onClick={resume}>ПРОДОЛЖИТЬ</button><span className={styles.resumeLocation}>{saved.completed?'ИСТОРИЯ ПРОЙДЕНА':GAME_TEXT.scenes[saved.scene].title}</span><button className={styles.secondaryButton} onClick={startNew}>НОВАЯ ИГРА</button></>:<button onClick={startNew}>START GAME</button>}</div><small>{GAME_TEXT.controls}</small></div>}
      {mode==='arcadeReady'&&arcadeHud&&<div className={styles.challengePanel}>
        <span className={styles.kicker}>{GAME_TEXT.scenes[scene].title}</span>
        <h2>{CHALLENGES[activeChallenge].title}</h2><p>{CHALLENGES[activeChallenge].instruction}</p><small>{CHALLENGES[activeChallenge].controls}</small>
        <button className={styles.primaryButton} onClick={interact}>ПОЕХАЛИ!</button>
      </div>}
      {mode==='arcadeResult'&&result&&<div className={styles.challengePanel} role="status">
        <h2>{result.won?CHALLENGES[result.id].success:CHALLENGES[result.id].failure}</h2>
        {result.won?<><div className={styles.medal} data-medal={result.medal}>★ <span>{MEDALS[result.medal]}</span></div><p>{result.seconds} с · {result.score} очков{result.id==='shooting'?` · Меткость ${result.shots?Math.round(result.hits/result.shots*100):0}%`:result.id==='ride'?` · Задето: ${result.bumps}`:''}</p><small>Рекорд: {saved?.best[result.id]?.score??result.score}</small></>:<p>Одно пятно. Ноль обид. Ещё попытка?</p>}
        <div className={styles.resultActions}><button className={styles.primaryButton} onClick={interact}>{!result.won?'ЕЩЁ ПОПЫТКА':'ДАЛЬШЕ ПО ИСТОРИИ'}</button></div>
      </div>}
      {mode==='intro'&&<button className={styles.cinematic} onClick={interact}><span>{GAME_TEXT.intro[introIndex].split('\n').map(part=><span key={part}>{part}</span>)}</span><small>SPACE TO CONTINUE</small></button>}
      {mode==='transition'&&<button onClick={interact} className={styles.transitionCard}><p>{GAME_TEXT.scenes[scene].label}</p><h2>{GAME_TEXT.scenes[scene].title}</h2><small>SPACE / ENTER / A — НАЧАТЬ УРОВЕНЬ</small></button>}
      {(mode==='playing'||mode==='dialog'||mode==='spill'||mode==='restore'||mode==='eating')&&<div className={styles.mission}><span>{GAME_TEXT.scenes[scene].label} / {String(GAME_TEXT.scenes.length).padStart(2,'0')}</span><strong>{mode==='eating'?GUEST_TEXT.eating:mode==='spill'?`Высыпаем землю — ${step}/3…`:mode==='restore'?`Земля: ${step}/3. Подожди, пока уборщица поставит цветок на место.`:objective}</strong><small>Жёлтая стрелка — цель · Space / Enter или A — действие</small></div>}
      {mode==='playing'&&activeTarget&&nearbyKey&&<button className={styles.prompt} onClick={interact}><kbd>SPACE</kbd> {activeTarget.label}</button>}
      {scene===0&&step<=4&&mode==='playing'&&<div className={styles.cleanerStatus} role="status">{caught?'«Я всё вижу». Подожди, пока она отвернётся.':watching?'Уборщица смотрит — подожди':'Она отвернулась — действуй! Следи за знаком !'}</div>}
      {(mode==='departure'||mode==='returning')&&<div className={styles.sceneCaption}>{mode==='departure'?ARCADE_TEXT.departure:ARCADE_TEXT.returning}</div>}
      {mode==='note'&&<button className={styles.noteReveal} onClick={interact} aria-label="Прочитать записку"><span className={styles.paper}><small>ЗАПИСКА НА ДНЕ ГОРШКА</small><strong>{DIALOG.noteMessage}</strong></span><span className={styles.stunned}>…</span><small>Space / Enter / A — продолжить</small></button>}
      {mode==='dialog'&&<button className={styles.dialog} onClick={interact} aria-live="polite"><span>{dialog[dialogIndex]}</span><small>{dialogIndex<dialog.length-1?'SPACE / NEXT':'SPACE / CONTINUE'} ▾</small></button>}
      {mode==='ending'&&endingReady&&<button className={styles.prompt} onClick={interact}>ПРОЧИТАТЬ ПИСЬМО ♥</button>}
      {mode==='final'&&<div className={styles.final}><p className={styles.complete}>LEVEL 38 COMPLETE</p><h2>MAIN QUEST STATUS:<br/><em>IN PROGRESS</em></h2><div className={styles.stats}>{GAME_TEXT.finalStats.map(stat=><span key={stat}>✓ {stat}</span>)}</div><div className={styles.letter}>{GAME_TEXT.letter.map((line,index)=><p key={index}>{line}</p>)}</div><button onClick={restart}>PLAY AGAIN</button></div>}
    </div>
    <div className={styles.mobileControls} aria-label="Экранное управление"><div className={styles.dpad}><button aria-label="Вверх" onPointerDown={(event)=>{event.currentTarget.setPointerCapture(event.pointerId);pressDirection('w',true);}} onPointerUp={()=>pressDirection('w',false)} onPointerCancel={()=>pressDirection('w',false)}>▲</button><button aria-label="Влево" onPointerDown={(event)=>{event.currentTarget.setPointerCapture(event.pointerId);pressDirection('a',true);}} onPointerUp={()=>pressDirection('a',false)} onPointerCancel={()=>pressDirection('a',false)}>◀</button><button aria-label="Вниз" onPointerDown={(event)=>{event.currentTarget.setPointerCapture(event.pointerId);pressDirection('s',true);}} onPointerUp={()=>pressDirection('s',false)} onPointerCancel={()=>pressDirection('s',false)}>▼</button><button aria-label="Вправо" onPointerDown={(event)=>{event.currentTarget.setPointerCapture(event.pointerId);pressDirection('d',true);}} onPointerUp={()=>pressDirection('d',false)} onPointerCancel={()=>pressDirection('d',false)}>▶</button></div><button className={styles.actionButton} aria-label={mode==='arcade'&&arcadeHud?.kind==='shooting'?'Стрелять':'Действие'}
      onPointerDown={(event)=>{if(stateRef.current.mode==='arcade'&&arcadeRef.current?.kind==='shooting'){event.currentTarget.setPointerCapture(event.pointerId);fireHeld.current=true;firePulse.current=true;}}}
      onPointerUp={()=>{fireHeld.current=false;}} onPointerCancel={()=>{fireHeld.current=false;}} onLostPointerCapture={()=>{fireHeld.current=false;}} onClick={interact}>A<small>{mode==='arcade'&&arcadeHud?.kind==='shooting'?'FIRE':'ACTION'}</small></button></div>
    <footer><span>{GAME_TEXT.controls}</span><div><button onClick={restart}>МЕНЮ</button></div></footer>
  </section></main>;
}
