import styles from "./GoalProbabilityBar.module.css";

function GoalProbabilityBar({ label, value, variant }) {
  if (value === undefined || value === null) return null;

  const percent = Math.max(0, Math.min(100, value * 100));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>{label}</span>
        <strong>{percent.toFixed(1)}%</strong>
      </div>
      <progress
        className={`${styles.bar} ${styles[variant]}`}
        value={percent}
        max="100"
        aria-label={`${label} ${percent.toFixed(1)}퍼센트`}
      />
    </div>
  );
}

export default GoalProbabilityBar;
