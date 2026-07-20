import styles from "./StatusState.module.css";

function LoadingState({ label = "데이터를 불러오는 중입니다." }) {
  return (
    <div className={styles.loading} role="status" aria-live="polite">
      <span className={styles.srOnly}>{label}</span>
      {Array.from({ length: 4 }, (_, index) => (
        <div className={styles.skeleton} key={index} aria-hidden="true">
          <span className={styles.skeletonTime} />
          <span className={styles.skeletonTeam} />
          <span className={styles.skeletonScore} />
          <span className={styles.skeletonTeam} />
        </div>
      ))}
    </div>
  );
}

export default LoadingState;
