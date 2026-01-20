export function getDelaySeverity(delay: number) {
  if (delay === 0) return "on-time";
  if (delay <= 10) return "low";
  if (delay <= 30) return "medium";
  return "high";
}
