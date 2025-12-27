import styles from "./MatchListHeader.module.css";

function MatchListHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.date}>날짜</div>
      <div className={styles.time}>시간</div>
      <div className={styles.center}>매치센터</div>
    </div>
  );
}

export default MatchListHeader;