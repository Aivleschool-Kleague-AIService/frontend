import WinProbabilityBar from "./WinProbabilityBar";
import GoalProbabilityBar from "./GoalProbabilityBar";

function MatchSummary({ match, probability }) {
  if (!match || !probability) return null;

  const d = new Date(match.matchDate);
  const dateText = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate()
  ).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;

  return (
    <div style={styles.wrapper}>
      <div style={styles.date}>{dateText}</div>

      <div style={styles.scoreRow}>
        <div style={styles.team}>
          <img
            src={match.homeTeam.logoUrl}
            alt=""
            style={styles.logo}
            onError={(e) => (e.currentTarget.src = "/default-team.png")}
          />
          <span>{match.homeTeam.name}</span>
        </div>

        <div style={styles.score}>
          {match.finalScore.home} - {match.finalScore.away}
        </div>

        <div style={styles.team}>
          <span>{match.awayTeam.name}</span>
          <img
            src={match.awayTeam.logoUrl}
            alt=""
            style={styles.logo}
            onError={(e) => (e.currentTarget.src = "/default-team.png")}
          />
        </div>
      </div>

      <WinProbabilityBar
        home={probability.home}
        draw={probability.draw}
        away={probability.away}
        minute={probability.minute}
      />

      <div style={{ marginTop: "20px" }}>
        <GoalProbabilityBar label="홈팀 골 확률" value={probability.homeGoal} color="#e74c3c" />
        <GoalProbabilityBar label="원정팀 골 확률" value={probability.awayGoal} color="#3498db" />
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: "40px 24px",
    background: "#2a2a2a",
    textAlign: "center",
  },
  date: {
    marginBottom: "16px",
    opacity: 0.8,
  },
  scoreRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "48px",
    marginBottom: "24px",
    flexWrap: "wrap",
  },
  team: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "18px",
  },
  logo: {
    width: "48px",
    height: "48px",
    objectFit: "contain",
  },
  score: {
    fontSize: "36px",
    fontWeight: "bold",
  },
};

export default MatchSummary;