import styles from "./StatusState.module.css";

function ErrorState({ message, onRetry }) {
  return (
    <div className={styles.panel} role="alert">
      <strong className={styles.title}>정보를 불러오지 못했습니다.</strong>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button className={styles.retryButton} type="button" onClick={onRetry}>
          다시 시도
        </button>
      )}
    </div>
  );
}

export default ErrorState;
