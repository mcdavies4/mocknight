// Nigeria is WAT (UTC+1) all year, no daylight saving.
const WAT_OFFSET_MS = 60 * 60 * 1000;

export function watNow(d = new Date()) {
  const w = new Date(d.getTime() + WAT_OFFSET_MS);
  return {
    date: w.toISOString().slice(0, 10), // YYYY-MM-DD in WAT
    hour: w.getUTCHours(),
    weekday: w.getUTCDay(), // 0 = Sunday
  };
}

export function watDateAddDays(date: string, days: number) {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Convert a WAT wall-clock time to a UTC Date. */
export function watToUtc(date: string, hour: number, minute = 0) {
  const hh = String(hour).padStart(2, "0");
  const mm = String(minute).padStart(2, "0");
  return new Date(`${date}T${hh}:${mm}:00+01:00`);
}

/** Next Sunday (today if it's Sunday) in WAT, as YYYY-MM-DD. */
export function nextSundayWat(d = new Date()) {
  const { date, weekday } = watNow(d);
  return watDateAddDays(date, (7 - weekday) % 7);
}

export function formatHour(h: number) {
  const suffix = h < 12 ? "am" : "pm";
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}${suffix}`;
}

export function formatWat(iso: string) {
  return new Date(iso).toLocaleString("en-NG", {
    timeZone: "Africa/Lagos",
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}
