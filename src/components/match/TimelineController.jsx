import { formatMatchMinute } from "../../features/matches/utils/formatMatchMinute";
import styles from "./TimelineController.module.css";

function TimelineController({
  minute,
  maxMinute,
  playing,
  onToggle,
  onReset,
  onChangeMinute,
}) {
  const hasTimeline = maxMinute > 0;
  const isAtEnd = hasTimeline && minute >= maxMinute;

  return (
    <section className={styles.controller} aria-labelledby="timeline-title">
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>MATCH FLOW</p>
          <h2 className={styles.title} id="timeline-title">
            경기 타임라인
          </h2>
        </div>
        <output className={styles.currentTime} htmlFor="match-timeline">
          {formatMatchMinute(minute)}
        </output>
      </div>

      <div className={styles.sliderRow}>
        <span className={styles.boundary}>0'</span>
        <input
          className={styles.slider}
          id="match-timeline"
          type="range"
          min="0"
          max={maxMinute}
          value={minute}
          disabled={!hasTimeline}
          onChange={(event) => onChangeMinute(Number(event.target.value))}
          aria-label="경기 시간 선택"
          aria-valuetext={formatMatchMinute(minute)}
        />
        <span className={styles.boundary}>{formatMatchMinute(maxMinute)}</span>
      </div>

      <div className={styles.controls}>
        <button
          className={styles.primaryButton}
          type="button"
          onClick={onToggle}
          disabled={!hasTimeline}
          aria-label={playing ? "타임라인 정지" : isAtEnd ? "처음부터 재생" : "타임라인 재생"}
        >
          <span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span>
          {playing ? "정지" : isAtEnd ? "처음부터" : "재생"}
        </button>
        <button
          className={styles.secondaryButton}
          type="button"
          onClick={onReset}
          disabled={minute === 0 && !playing}
        >
          <span aria-hidden="true">↺</span>
          초기화
        </button>
      </div>
    </section>
  );
}

export default TimelineController;
