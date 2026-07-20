import { formatMatchMinute } from "../../features/matches/utils/formatMatchMinute";
import styles from "./ProbabilityChart.module.css";

const VIEWBOX_WIDTH = 1000;
const VIEWBOX_HEIGHT = 320;
const PLOT_LEFT = 54;
const PLOT_RIGHT = 980;
const PLOT_TOP = 20;
const PLOT_BOTTOM = 274;
const PLOT_WIDTH = PLOT_RIGHT - PLOT_LEFT;
const PLOT_HEIGHT = PLOT_BOTTOM - PLOT_TOP;

function getX(minute, maxMinute) {
  if (maxMinute <= 0) return PLOT_LEFT;
  return PLOT_LEFT + (minute / maxMinute) * PLOT_WIDTH;
}

function getY(percent) {
  return PLOT_TOP + ((100 - percent) / 100) * PLOT_HEIGHT;
}

function getLinePoints(timeline, field, maxMinute) {
  return timeline
    .filter((point) => point[field] != null)
    .map((point) => `${getX(point.minute, maxMinute)},${getY(point[field])}`)
    .join(" ");
}

function ProbabilityChart({ timeline, minute, maxMinute, onChangeMinute }) {
  if (timeline.length === 0 || maxMinute <= 0) {
    return (
      <section className={styles.empty} aria-labelledby="probability-chart-title">
        <h2 id="probability-chart-title">승률 변화</h2>
        <p>표시할 승률 타임라인이 없습니다.</p>
      </section>
    );
  }

  const homePoints = getLinePoints(timeline, "home", maxMinute);
  const drawPoints = getLinePoints(timeline, "draw", maxMinute);
  const awayPoints = getLinePoints(timeline, "away", maxMinute);
  const selectedPoint = timeline.find((point) => point.minute === minute);
  const selectedX = getX(minute, maxMinute);
  const middleMinute = Math.round(maxMinute / 2);

  const selectMinuteFromPointer = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const viewBoxX = ((event.clientX - bounds.left) / bounds.width) * VIEWBOX_WIDTH;
    const ratio = Math.max(0, Math.min(1, (viewBoxX - PLOT_LEFT) / PLOT_WIDTH));
    onChangeMinute(Math.round(ratio * maxMinute));
  };

  const handleKeyDown = (event) => {
    let nextMinute = minute;

    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      nextMinute = Math.max(0, minute - 1);
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      nextMinute = Math.min(maxMinute, minute + 1);
    } else if (event.key === "Home") {
      nextMinute = 0;
    } else if (event.key === "End") {
      nextMinute = maxMinute;
    } else {
      return;
    }

    event.preventDefault();
    onChangeMinute(nextMinute);
  };

  const currentText = selectedPoint
    ? `${formatMatchMinute(minute)} 홈 ${selectedPoint.home?.toFixed(0) ?? "-"}퍼센트, 무승부 ${selectedPoint.draw?.toFixed(0) ?? "-"}퍼센트, 원정 ${selectedPoint.away?.toFixed(0) ?? "-"}퍼센트`
    : `${formatMatchMinute(minute)} 승률 데이터 없음`;

  return (
    <section className={styles.chartCard} aria-labelledby="probability-chart-title">
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>WIN PROBABILITY</p>
          <h2 className={styles.title} id="probability-chart-title">
            승률 변화
          </h2>
        </div>
        <div className={styles.legend} aria-label="그래프 범례">
          <span className={styles.homeLegend}>홈</span>
          <span className={styles.drawLegend}>무승부</span>
          <span className={styles.awayLegend}>원정</span>
        </div>
      </div>

      <p className={styles.instructions} id="chart-instructions">
        그래프를 클릭하거나 방향키로 시간을 변경할 수 있습니다.
      </p>

      <div
        className={styles.interaction}
        role="slider"
        tabIndex="0"
        aria-label="승률 그래프 시간 선택"
        aria-describedby="chart-instructions"
        aria-valuemin="0"
        aria-valuemax={maxMinute}
        aria-valuenow={minute}
        aria-valuetext={currentText}
        onClick={selectMinuteFromPointer}
        onKeyDown={handleKeyDown}
      >
        <svg
          className={styles.chart}
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {[0, 25, 50, 75, 100].map((percent) => (
            <g key={percent}>
              <line
                className={styles.gridLine}
                x1={PLOT_LEFT}
                x2={PLOT_RIGHT}
                y1={getY(percent)}
                y2={getY(percent)}
              />
              <text className={styles.yLabel} x="4" y={getY(percent) + 4}>
                {percent}
              </text>
            </g>
          ))}

          <polyline className={styles.homeLine} points={homePoints} />
          <polyline className={styles.drawLine} points={drawPoints} />
          <polyline className={styles.awayLine} points={awayPoints} />

          <line
            className={styles.selectionLine}
            x1={selectedX}
            x2={selectedX}
            y1={PLOT_TOP}
            y2={PLOT_BOTTOM}
          />

          {selectedPoint?.home != null && (
            <circle className={styles.homePoint} cx={selectedX} cy={getY(selectedPoint.home)} r="6" />
          )}
          {selectedPoint?.draw != null && (
            <circle className={styles.drawPoint} cx={selectedX} cy={getY(selectedPoint.draw)} r="6" />
          )}
          {selectedPoint?.away != null && (
            <circle className={styles.awayPoint} cx={selectedX} cy={getY(selectedPoint.away)} r="6" />
          )}

          <text className={styles.xLabel} x={PLOT_LEFT} y="310" textAnchor="start">
            0'
          </text>
          <text className={styles.xLabel} x={getX(middleMinute, maxMinute)} y="310" textAnchor="middle">
            {formatMatchMinute(middleMinute)}
          </text>
          <text className={styles.xLabel} x={PLOT_RIGHT} y="310" textAnchor="end">
            {formatMatchMinute(maxMinute)}
          </text>
        </svg>
      </div>

      <p className={styles.currentText}>
        {currentText}
      </p>
    </section>
  );
}

export default ProbabilityChart;
