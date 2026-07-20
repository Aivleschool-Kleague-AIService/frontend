import { useState } from "react";
import styles from "./MatchHeader.module.css";

function TeamCrest({ team }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (!team.logoUrl || imageFailed) {
    return (
      <span className={styles.logoFallback} aria-hidden="true">
        {team.name.slice(0, 1)}
      </span>
    );
  }

  return (
    <span className={styles.logoFrame}>
      <img src={team.logoUrl} alt="" onError={() => setImageFailed(true)} />
    </span>
  );
}

function MatchHeader({ match }) {
  if (!match) return null;

  const matchDate = new Date(match.matchDate);
  const dateText = Number.isNaN(matchDate.getTime())
    ? "경기 일시 미정"
    : new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(matchDate);

  return (
    <section className={styles.header} aria-labelledby="match-title">
      <p className={styles.date}>{dateText}</p>
      <h1 className={styles.srOnly} id="match-title">
        {match.homeTeam.name} 대 {match.awayTeam.name}
      </h1>

      <div className={styles.matchup}>
        <div className={`${styles.team} ${styles.homeTeam}`}>
          <TeamCrest team={match.homeTeam} />
          <strong className={styles.teamName}>{match.homeTeam.name}</strong>
          <span className={styles.side}>HOME</span>
        </div>

        <div className={styles.score} aria-label={`최종 점수 ${match.finalScore?.home ?? "미정"} 대 ${match.finalScore?.away ?? "미정"}`}>
          <strong>{match.finalScore?.home ?? "-"}</strong>
          <span>:</span>
          <strong>{match.finalScore?.away ?? "-"}</strong>
          <small>FINAL</small>
        </div>

        <div className={`${styles.team} ${styles.awayTeam}`}>
          <TeamCrest team={match.awayTeam} />
          <strong className={styles.teamName}>{match.awayTeam.name}</strong>
          <span className={styles.side}>AWAY</span>
        </div>
      </div>
    </section>
  );
}

export default MatchHeader;
