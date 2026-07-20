function toRatio(value) {
  if (value == null) return null;

  const number = Number(value);
  if (!Number.isFinite(number)) return null;

  const ratio = number > 1 ? number / 100 : number;
  return Math.max(0, Math.min(1, ratio));
}

export function normalizeGoalTimeline(timeline = []) {
  return timeline
    .map((point) => ({
      minute: Number(point.minute),
      homeGoalProbability: toRatio(
        point.homeGoalProbability ?? point.home_goal_probability
      ),
      awayGoalProbability: toRatio(
        point.awayGoalProbability ?? point.away_goal_probability
      ),
    }))
    .filter((point) => Number.isFinite(point.minute) && point.minute >= 0)
    .sort((first, second) => first.minute - second.minute);
}
