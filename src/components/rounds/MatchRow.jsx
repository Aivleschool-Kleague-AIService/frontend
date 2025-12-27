import styles from "./MatchRow.module.css";

function MatchRow({ match }) {
  const d = new Date(match.matchDate);

  const date = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate()
  ).padStart(2, "0")}`;

  const time = `${String(d.getHours()).padStart(2, "0")}:${String(
    d.getMinutes()
  ).padStart(2, "0")}`;

  return (
    <div className={styles.row}>
      <div className={styles.date}>{date}</div>
      <div className={styles.time}>{time}</div>

      <div className={styles.match}>
        <div className={styles.team}>
          <img src={match.homeTeam.logoUrl} alt="" />
          <span>{match.homeTeam.name}</span>
        </div>

        <div className={styles.score}>
          {match.finalScore.home} : {match.finalScore.away}
        </div>

        <div className={styles.team}>
          <span>{match.awayTeam.name}</span>
          <img src={match.awayTeam.logoUrl} alt="" />
        </div>
      </div>
    </div>
  );
}

export default MatchRow;