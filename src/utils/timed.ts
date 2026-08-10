/** Time helpers for the timed daily-practice sprint mode. */

/** Default sprint length — the headline "10 minute practice". */
export const DEFAULT_SPRINT_SECONDS = 10 * 60;

/** One-tap preset sprint lengths, in minutes. */
export const SPRINT_PRESET_MINUTES = [5, 10, 15, 20, 30];

const MIN_SECONDS = 60; // 1 minute
const MAX_SECONDS = 60 * 60; // 1 hour

/**
 * Parse a user-typed sprint duration into seconds, or null if invalid.
 *
 * Accepted forms (whitespace tolerated):
 *   "12"          → 12 minutes
 *   "12m" "12min" → 12 minutes
 *   "90s"         → 90 seconds
 *   "2:30"        → 2 minutes 30 seconds
 *
 * Results are clamped to [1 minute, 1 hour].
 */
export function parseDuration(input: string): number | null {
  const raw = input.trim().toLowerCase();
  if (!raw) return null;

  // mm:ss
  let m = raw.match(/^(\d{1,3}):(\d{2})$/);
  if (m) {
    const minutes = Number.parseInt(m[1], 10);
    const seconds = Number.parseInt(m[2], 10);
    if (seconds >= 60) return null;
    return clampSeconds(minutes * 60 + seconds);
  }

  // seconds
  m = raw.match(/^(\d{1,4})s$/);
  if (m) return clampSeconds(Number.parseInt(m[1], 10));

  // minutes ("12", "12m", "12min", "12 minutes")
  m = raw.match(/^(\d{1,3})(?:\s*m(?:in(?:utes?)?)?)?$/);
  if (m) return clampSeconds(Number.parseInt(m[1], 10) * 60);

  return null;
}

function clampSeconds(seconds: number): number {
  return Math.min(MAX_SECONDS, Math.max(MIN_SECONDS, seconds));
}

/** Format a duration as mm:ss (ceil, so 0.4s remaining still shows 00:01). */
export function formatClock(totalSeconds: number): string {
  const s = Math.max(0, Math.ceil(totalSeconds));
  const mm = Math.floor(s / 60);
  const ss = s % 60;
  return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}
