import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MatchCard.module.css";

function TeamMark({ team }) {
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
      <img
        src={team.logoUrl}
        alt=""
        onError={() => setImageFailed(true)}
      />
    </span>
  );
}

function MatchCard({ match }) {
  const navigate = useNavigate();
  const matchDate = new Date(match.matchDate);
  const hasValidDate = !Number.isNaN(matchDate.getTime());
  const time = hasValidDate
    ? new Intl.DateTimeFormat("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(matchDate)
    : "시간 미정";

  const homeScore = match.finalScore?.home ?? "-";
  const awayScore = match.finalScore?.away ?? "-";
  const accessibleLabel = `${time}, ${match.homeTeam.name} ${homeScore} 대 ${awayScore} ${match.awayTeam.name} 경기 상세 보기`;

  return (
    <button
      className={styles.card}
      type="button"
      onClick={() =>
        navigate(`/matches/${match.matchId}`, {
          state: { match },
        })
      }
      aria-label={accessibleLabel}
    >
      <time className={styles.time} dateTime={match.matchDate}>
        {time}
      </time>

      <span className={`${styles.team} ${styles.homeTeam}`}>
        <TeamMark team={match.homeTeam} />
        <span className={styles.teamName}>{match.homeTeam.name}</span>
      </span>

      <span className={styles.score} aria-hidden="true">
        <strong>{homeScore}</strong>
        <span>:</span>
        <strong>{awayScore}</strong>
      </span>

      <span className={`${styles.team} ${styles.awayTeam}`}>
        <span className={styles.teamName}>{match.awayTeam.name}</span>
        <TeamMark team={match.awayTeam} />
      </span>

      <span className={styles.detail} aria-hidden="true">상세 보기 →</span>
    </button>
  );
}

export default MatchCard;
