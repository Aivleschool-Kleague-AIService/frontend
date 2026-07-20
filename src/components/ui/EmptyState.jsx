import styles from "./StatusState.module.css";

function EmptyState({ message }) {
  return (
    <div className={styles.panel} role="status">
      <strong className={styles.title}>표시할 경기가 없습니다.</strong>
      <p className={styles.message}>{message}</p>
    </div>
  );
}

export default EmptyState;
