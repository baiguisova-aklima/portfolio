import type { ChallengeId, ChallengeResult } from './arcade';
export const SAVE_KEY = 'aleksei-level-38-progress-v1';
export type Progress = { version: 1; scene: number; step: number; completed: boolean; best: Partial<Record<ChallengeId, ChallengeResult>> };
export const EMPTY_PROGRESS: Progress = { version: 1, scene: 0, step: 0, completed: false, best: {} };
const maxSteps = [6, 1, 4, 3, 1, 3, 0, 0, 0];
export function parseProgress(raw: string | null): Progress | null {
  if (!raw) return null;
  try {
    const p = JSON.parse(raw);
    if (p.version !== 1 || !Number.isInteger(p.scene) || p.scene < 0 || p.scene >= maxSteps.length ||
      !Number.isInteger(p.step) || p.step < 0 || p.step > maxSteps[p.scene] || typeof p.completed !== 'boolean') return null;
    const best: Progress['best'] = {};
    for (const id of ['cleaner', 'chase', 'ride', 'shooting'] as const) {
      const r = p.best?.[id];
      if (r?.id === id && r.won === true && ['gold', 'silver', 'bronze'].includes(r.medal) &&
        ['seconds', 'score', 'shots', 'hits', 'bumps'].every(key => typeof r[key] === 'number' && Number.isFinite(r[key]) && r[key] >= 0)) best[id] = r;
    }
    return { version: 1, scene: p.scene, step: p.step, completed: p.completed, best };
  } catch { return null; }
}
export function withResult(progress: Progress, result: ChallengeResult): Progress {
  if (!result.won || (progress.best[result.id]?.score ?? -1) >= result.score) return progress;
  return { ...progress, best: { ...progress.best, [result.id]: result } };
}
