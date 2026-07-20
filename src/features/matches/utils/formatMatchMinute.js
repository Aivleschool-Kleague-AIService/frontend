export function formatMatchMinute(minute) {
  const safeMinute = Math.max(0, Number(minute) || 0);

  if (safeMinute > 90) {
    return `90+${safeMinute - 90}'`;
  }

  return `${safeMinute}'`;
}
