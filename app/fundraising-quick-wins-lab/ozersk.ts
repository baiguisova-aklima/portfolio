// Shared by interaction validation, HUD and animation. All three rounds signal turns.
export const SPILL_DURATION = 1200;
export const RESTORE_DURATION = 2600;
export function cleanerAt(time: number, round = 0) {
  const difficulty = Math.min(Math.max(round, 0), 2);
  const period = [9000, 7800, 6900][difficulty];
  const phase = Math.max(0, time) % period;
  const firstTurn = [3500, 2800, 2600][difficulty];
  const lastTurn = [8700, 7200, 6300][difficulty];
  // Later rounds contain a clearly telegraphed glance back.
  const glanceStart = difficulty === 1 ? 4400 : 3800;
  const glanceEnd = difficulty === 1 ? 5100 : 4400;
  const glance = difficulty > 0 && phase >= glanceStart && phase < glanceEnd;
  const watching = phase < firstTurn || phase >= lastTurn || glance;
  const warning = !watching && (lastTurn - phase <= 650 || difficulty > 0 && phase < glanceStart && glanceStart - phase <= 650);
  const travel = Math.min(1, Math.max(0, (phase - firstTurn) / 1100));
  const returning = Math.min(1, Math.max(0, (phase - lastTurn + 700) / 700));
  return { watching, warning, round: difficulty, x: 790 + 45 * travel * (1 - returning), y: 404 - 48 * travel * (1 - returning), facing: watching || warning ? 'left' : 'right' };
}
