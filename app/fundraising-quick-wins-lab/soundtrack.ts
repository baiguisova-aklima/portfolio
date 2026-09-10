// Original laid-back urban groove: electric keys, bass and a small drum machine.
// No sampled audio or melodies from a commercial game.
export function startEndingTheme(context: AudioContext): () => void {
  const master=context.createGain();master.gain.value=.13;master.connect(context.destination);
  const sources=new Set<AudioScheduledSourceNode>();
  const noise=context.createBuffer(1,Math.ceil(context.sampleRate*.2),context.sampleRate);
  const samples=noise.getChannelData(0);for(let i=0;i<samples.length;i++)samples[i]=(Math.random()*2-1)*Math.exp(-i/samples.length*3);
  let stopped=false,next=context.currentTime+.04,step=0;
  const eighth=60/88/2;
  function track(source:AudioScheduledSourceNode,at:number,duration:number,nodes:AudioNode[]){
    sources.add(source);source.onended=()=>{sources.delete(source);source.disconnect();nodes.forEach(n=>n.disconnect());};source.start(at);source.stop(at+duration);
  }
  function tone(midi:number,at:number,duration:number,volume:number,type:OscillatorType='sine'){
    const oscillator=context.createOscillator(),gain=context.createGain();oscillator.type=type;oscillator.frequency.value=440*2**((midi-69)/12);
    gain.gain.setValueAtTime(0,at);gain.gain.linearRampToValueAtTime(volume,at+.012);gain.gain.exponentialRampToValueAtTime(.001,at+duration);
    oscillator.connect(gain);gain.connect(master);track(oscillator,at,duration,[gain]);
  }
  function drum(at:number,volume:number,snare=false){
    const source=context.createBufferSource(),filter=context.createBiquadFilter(),gain=context.createGain();source.buffer=noise;
    filter.type='highpass';filter.frequency.value=snare?1400:6500;gain.gain.setValueAtTime(volume,at);gain.gain.exponentialRampToValueAtTime(.001,at+(snare?.14:.045));
    source.connect(filter);filter.connect(gain);gain.connect(master);track(source,at,.18,[filter,gain]);
  }
  function kick(at:number){
    const oscillator=context.createOscillator(),gain=context.createGain();oscillator.frequency.setValueAtTime(120,at);oscillator.frequency.exponentialRampToValueAtTime(43,at+.12);
    gain.gain.setValueAtTime(.8,at);gain.gain.exponentialRampToValueAtTime(.001,at+.22);oscillator.connect(gain);gain.connect(master);track(oscillator,at,.23,[gain]);
  }
  const chords=[[52,55,59,62,66],[48,52,55,59,62],[45,52,55,59,60],[47,54,57,61,64]];
  const bass=[[40,47,38],[36,43,35],[33,40,36],[35,42,38]];
  const melody=[71,66,69,64,67,62,66,64];
  function schedule(){
    if(stopped)return;
    while(next<context.currentTime+.18){
      const bar=Math.floor(step/8)%4,beat=step%8;
      if(beat===0||beat===5)kick(next);
      if(beat===2||beat===6)drum(next,.34,true);
      drum(next,beat%2?.09:.14);
      if(beat===0||beat===3||beat===6)tone(bass[bar][beat===0?0:beat===3?1:2],next,eighth*1.7,.65,'triangle');
      if(beat===1||beat===5)chords[bar].forEach((note,i)=>tone(note,next+i*.006,eighth*2.5,.1));
      if(Math.floor(step/32)%2===1&&(beat===3||beat===7))tone(melody[bar*2+(beat===7?1:0)],next,eighth*1.4,.18,'triangle');
      next+=eighth;step++;
    }
  }
  schedule();const timer=setInterval(schedule,60);
  return()=>{stopped=true;clearInterval(timer);for(const source of sources){try{source.stop();}catch{}}sources.clear();master.disconnect();};
}
