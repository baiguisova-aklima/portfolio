// Deterministic simulation: seconds in, state out. No DOM, React or timers.
export type ChallengeId = 'cleaner' | 'chase' | 'ride' | 'shooting';
export type ArcadeKind = Exclude<ChallengeId, 'cleaner'>;
export type Medal = 'gold' | 'silver' | 'bronze';
export type ChallengeResult = { id: ChallengeId; won: boolean; seconds: number; score: number; medal: Medal; shots: number; hits: number; bumps: number };
export type ArcadeInput = { x: number; y: number; fire: boolean };
export type ArcadeState = {
  kind: ArcadeKind; time: number; x: number; y: number; stage: number; stageTime: number;
  hp: number; shots: number; hits: number; cooldown: number; flash: number; blocked: number;
  bullets: { x: number; y: number }[]; intermission: number; distance: number; bumps: number;
  obstacles: { x: number; y: number; hit: boolean; type: number }[]; nextObstacle: number;
  dog: { x: number; y: number }; result: ChallengeResult | null;
};
export const TARGET_HP = [3, 3, 3, 3];
export const RIDE_DISTANCE = 840;
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
export function createArcade(kind: ArcadeKind): ArcadeState {
  return { kind, time: 0, x: kind === 'chase' ? 190 : 450, y: kind === 'chase' ? 445 : 452,
    stage: 0, stageTime: 0, hp: TARGET_HP[0], shots: 0, hits: 0, cooldown: 0, flash: 0, blocked: 0,
    bullets: [], intermission: 0, distance: 0, bumps: 0, obstacles: [], nextObstacle: 1.5,
    dog: { x: 790, y: 430 }, result: null };
}
export function shootingTarget(a: ArcadeState) {
  const t = a.stageTime;
  const x = a.stage === 0 ? 450 + 275 * Math.sin(t * 1.25) : a.stage === 1 ? 450 + 170 * Math.sin(t * .65)
    : a.stage === 2 ? 450 + 245 * Math.sin(t * 1.55) : 450 + 265 * Math.sin(t * 1.05);
  const y = a.stage === 2 ? 223 + 42 * Math.sin(t * 2.8) : 218 + Math.sin(t) * 12;
  return { x, y, open: a.stage !== 1 || t % 4 >= 1.5, halfWidth: 38 };
}
export function finishResult(a: ArcadeState, won = true): ChallengeResult {
  const accuracy = a.shots ? a.hits / a.shots : 0;
  const medal: Medal = a.kind === 'shooting' ? accuracy >= .5 && a.time <= 90 ? 'gold' : accuracy >= .25 ? 'silver' : 'bronze'
    : a.kind === 'ride' ? a.bumps === 0 ? 'gold' : a.bumps <= 3 ? 'silver' : 'bronze'
    : a.time < 3.7 ? 'gold' : a.time < 5 ? 'silver' : 'bronze';
  const rank = medal === 'gold' ? 3000 : medal === 'silver' ? 2000 : 1000;
  return { id: a.kind, won, seconds: Math.round(a.time * 10) / 10, medal,
    score: won ? rank + Math.max(0, 999 - Math.round(a.time * 3) - a.bumps * 50) : 0,
    shots: a.shots, hits: a.hits, bumps: a.bumps };
}
export function cleanerResult(seconds: number, mistakes: number): ChallengeResult {
  const medal = mistakes === 0 ? 'gold' : mistakes <= 2 ? 'silver' : 'bronze';
  return { id: 'cleaner', won: true, seconds: Math.round(seconds), medal,
    score: (medal === 'gold' ? 3000 : medal === 'silver' ? 2000 : 1000) + Math.max(0, 999 - Math.round(seconds)),
    shots: 0, hits: 0, bumps: mistakes };
}
export function updateArcade(a: ArcadeState, input: ArcadeInput, delta: number) {
  if (a.result) return;
  const dt = clamp(delta, 0, .04);
  a.time += dt; a.stageTime += dt;
  a.flash = Math.max(0, a.flash - dt); a.blocked = Math.max(0, a.blocked - dt);
  a.cooldown = Math.max(0, a.cooldown - dt);
  if (a.kind === 'chase') {
    const length = Math.max(1, Math.hypot(input.x, input.y));
    a.x = clamp(a.x + input.x / length * 235 * dt, 28, 872);
    a.y = clamp(a.y + input.y / length * 235 * dt, 330, 490);
    const progress = clamp((a.time - 1) / 4.7, 0, 1);
    a.dog = { x: 790 - 345 * progress, y: 430 - 60 * progress + Math.sin(progress * Math.PI * 3) * 32 };
    if (a.time >= 1 && Math.hypot(a.x - a.dog.x, a.y - a.dog.y) < 37) a.result = finishResult(a);
    else if (progress === 1) a.result = finishResult(a, false);
    return;
  }
  a.x = clamp(a.x + input.x * (a.kind === 'shooting' ? 340 : 300) * dt, a.kind === 'ride' ? 230 : 70, a.kind === 'ride' ? 670 : 830);
  if (a.kind === 'ride') {
    a.distance += (a.flash > 0 ? 14 : 24) * dt;
    if (a.time >= a.nextObstacle && a.distance < RIDE_DISTANCE - 100) {
      const index = Math.round((a.nextObstacle - 1.5) / 2.1);
      const lanes = [275, 450, 625, 350, 540, 240, 660, 420, 575, 315];
      a.obstacles.push({ x: lanes[index % lanes.length], y: 115, hit: false, type: index % 3 });
      a.nextObstacle += 2.1;
    }
    for (const obstacle of a.obstacles) {
      obstacle.y += 145 * dt;
      if (!obstacle.hit && Math.abs(obstacle.x - a.x) < 43 && Math.abs(obstacle.y - a.y) < 34) {
        obstacle.hit = true; a.bumps++; a.flash = .9;
      }
    }
    a.obstacles = a.obstacles.filter(o => o.y < 560);
    if (a.distance >= RIDE_DISTANCE) a.result = finishResult(a);
    return;
  }
  if (a.intermission > 0) {
    a.intermission = Math.max(0, a.intermission - dt);
    if (a.intermission === 0) {
      if (a.stage === 3) { a.result = finishResult(a); return; }
      a.stage++; a.hp = TARGET_HP[a.stage]; a.stageTime = 0;
    }
    return;
  }
  if (input.fire && a.cooldown === 0) {
    a.bullets.push({ x: a.x, y: a.y - 38 }); a.shots++; a.cooldown = .18;
  }
  const target = shootingTarget(a);
  a.bullets = a.bullets.filter(bullet => {
    if (a.hp <= 0) return false;
    const previousY = bullet.y;
    bullet.y -= 660 * dt;
    if (bullet.y <= target.y + 36 && previousY >= target.y - 36 && Math.abs(bullet.x - target.x) <= target.halfWidth) {
      if (target.open) { a.hits++; a.hp--; a.flash = .14; }
      else a.blocked = .3;
      if (a.hp === 0) { a.intermission = 1.8; }
      return false;
    }
    return bullet.y > 70;
  });
  // No projectiles carry over to a fresh target or damage a defeated one.
  if (a.hp <= 0) { a.hp = 0; a.bullets = []; }
}
