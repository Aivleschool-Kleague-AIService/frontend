import { useNavigate } from "react-router-dom";
import styles from "./MatchRow.module.css";

function MatchRow({ match }) {
  const navigate = useNavigate();

  // 안전 장치: 날짜 데이터가 없을 경우
  if (!match?.matchDate) return null;

  const d = new Date(match.matchDate);

  const date = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate()
  ).padStart(2, "0")}`;

  const time = `${String(d.getHours()).padStart(2, "0")}:${String(
    d.getMinutes()
  ).padStart(2, "0")}`;

  return (
    <div
      className={styles.row}
      onClick={() =>
        navigate(`/matches/${match.matchId}`, {
          state: { match }, // ✅ [추가]
        })
      }
    >
      {/* 날짜 */}
      <div className={styles.date}>{date}</div>

      {/* 시간 */}
      <div className={styles.time}>{time}</div>

      {/* 매치 영역 */}
      <div className={styles.match}>
        {/* 홈팀 */}
        <div className={styles.team}>
          <img
            src={match.homeTeam.logoUrl}
            alt={match.homeTeam.name}
            onError={(e) => {
              e.currentTarget.src = "/default-team.png";
            }}
          />
          <span>{match.homeTeam.name}</span>
        </div>

        {/* 스코어 */}
        <div className={styles.score}>
          {match.finalScore.home} : {match.finalScore.away}
        </div>

        {/* 원정팀 */}
        <div className={styles.team}>
          <span>{match.awayTeam.name}</span>
          <img
            src={match.awayTeam.logoUrl}
            alt={match.awayTeam.name}
            onError={(e) => {
              e.currentTarget.src = "/default-team.png";
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default MatchRow;