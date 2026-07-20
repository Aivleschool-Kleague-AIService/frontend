function toPercent(value) {
  if (value == null) return null;

  const number = Number(value);
  if (!Number.isFinite(number)) return null;

  const percent = number >= 0 && number <= 1 ? number * 100 : number;
  return Math.max(0, Math.min(100, percent));
}

/**
 * @typedef {Object} WinTimelinePoint
 * @property {number} minute
 * @property {number|null} home
 * @property {number|null} draw
 * @property {number|null} away
 */

/**
 * 백엔드 승률 응답을 그래프와 현재 확률 표시가 공유하는 DTO로 변환한다.
 *
 * @param {Array<Object>} timeline
 * @returns {WinTimelinePoint[]}
 */
export function normalizeWinTimeline(timeline = []) {
  return timeline
    .map((point) => ({
      minute: Number(point.minute),
      home: toPercent(
        point.homeWinProbability ?? point.home ?? point.home_win_probability
      ),
      draw: toPercent(
        point.drawWinProbability ?? point.draw ?? point.draw_win_probability
      ),
      away: toPercent(
        point.awayWinProbability ?? point.away ?? point.away_win_probability
      ),
    }))
    .filter((point) => Number.isFinite(point.minute) && point.minute >= 0)
    .sort((first, second) => first.minute - second.minute);
}
