import styles from "./WinProbabilityBar.module.css";
import { formatMatchMinute } from "../../features/matches/utils/formatMatchMinute";

function WinProbabilityBar({ home, draw, away, minute }) {
  if (home == null && draw == null && away == null) return null;

  const h = Number(home) || 0;
  const d = Number(draw) || 0;
  const a = Number(away) || 0;

  const clamp = (v) => Math.max(0, Math.min(100, v));
  const homePercent = clamp(h);
  const drawPercent = clamp(d);
  const awayPercent = clamp(a);
  const accessibleText = `홈 승리 ${homePercent.toFixed(0)}퍼센트, 무승부 ${drawPercent.toFixed(0)}퍼센트, 원정 승리 ${awayPercent.toFixed(0)}퍼센트`;

  return (
    <section className={styles.container} aria-label={accessibleText}>
      <div className={styles.heading}>
        <h2 className={styles.title}>승부 확률</h2>
        {minute !== undefined && (
          <span className={styles.minute}>{formatMatchMinute(minute)}</span>
        )}
      </div>

      <div className={styles.values} aria-hidden="true">
        <div className={`${styles.value} ${styles.homeValue}`}>
          <span>홈 승리</span>
          <strong>{homePercent.toFixed(0)}%</strong>
        </div>
        <div className={`${styles.value} ${styles.drawValue}`}>
          <span>무승부</span>
          <strong>{drawPercent.toFixed(0)}%</strong>
        </div>
        <div className={`${styles.value} ${styles.awayValue}`}>
          <span>원정 승리</span>
          <strong>{awayPercent.toFixed(0)}%</strong>
        </div>
      </div>

      <svg
        className={styles.bar}
        viewBox="0 0 100 12"
        preserveAspectRatio="none"
        role="img"
        aria-label={accessibleText}
      >
        <rect className={styles.home} x="0" y="0" width={homePercent} height="12" />
        <rect className={styles.draw} x={homePercent} y="0" width={drawPercent} height="12" />
        <rect className={styles.away} x={homePercent + drawPercent} y="0" width={awayPercent} height="12" />
      </svg>
    </section>
  );
}

export default WinProbabilityBar;
