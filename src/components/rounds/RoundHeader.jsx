import styles from "./RoundHeader.module.css";

function RoundHeader({ round }) {
  return (
    <div className={styles.header}>
      <span className={styles.round}>{round.roundNumber}R</span>
      <span className={styles.period}>
        {round.startDate.replace(/-/g, ".")} ~{" "}
        {round.endDate.replace(/-/g, ".")}
      </span>
    </div>
  );
}

export default RoundHeader;