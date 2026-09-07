// Shared by interaction validation, the HUD and the cleaner's animation.
export const SPILL_DURATION = 1200;
export const RESTORE_DURATION = 2600;
export function cleanerAt(time: number) {
  const phase = time % 9000;
  const watching = phase < 3500;
  const travel = Math.min(1, Math.max(0, (phase - 4500) / 1200));
  const returning = Math.min(1, Math.max(0, (phase - 7600) / 1200));
  return { watching, x: 790 + 45 * travel * (1 - returning), y: 404 - 48 * travel * (1 - returning), facing: watching ? 'left' : 'right' };
}
