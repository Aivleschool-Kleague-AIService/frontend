import WinProbabilityBar from "./WinProbabilityBar";
import GoalProbabilityBar from "./GoalProbabilityBar";

function MatchSummary({ match, probability }) {
  if (!match) return null;

  // ✅ 백엔드 데이터 안전 처리
  const time = probability?.minute ?? probability?.time ?? 0;

  const homeWin = probability?.home ?? null;
  const drawWin = probability?.draw ?? null;
  const awayWin = probability?.away ?? null;

  const homeGoal =
    probability?.homeGoalProbability ??
    probability?.homeGoal ??
    null;

  const awayGoal =
    probability?.awayGoalProbability ??
    probability?.awayGoal ??
    null;

  const d = new Date(match.matchDate);
  const dateText = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}.${String(d.getDate()).padStart(2, "0")} ${String(
    d.getHours()
  ).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;

  return (
    <div style={styles.wrapper}>
      <div style={styles.date}>{dateText}</div>

      <div style={styles.scoreRow}>
        <div style={styles.team}>
          <img src={match.homeTeam.logoUrl} alt="" style={styles.logo} />
          <span>{match.homeTeam.name}</span>
        </div>

        <div style={styles.score}>
          {match.finalScore.home} - {match.finalScore.away}
        </div>

        <div style={styles.team}>
          <span>{match.awayTeam.name}</span>
          <img src={match.awayTeam.logoUrl} alt="" style={styles.logo} />
        </div>
      </div>

      {/* ✅ 승리 확률 */}
      <WinProbabilityBar
        home={homeWin}
        draw={drawWin}
        away={awayWin}
        minute={time}
      />

      {/* ✅ 골 확률 (값 있을 때만) */}
      {(homeGoal != null || awayGoal != null) && (
        <div style={{ marginTop: "20px" }}>
          {homeGoal != null && (
            <GoalProbabilityBar
              label="홈팀 골 확률"
              value={homeGoal}
              color="#e74c3c"
            />
          )}
          {awayGoal != null && (
            <GoalProbabilityBar
              label="원정팀 골 확률"
              value={awayGoal}
              color="#3498db"
            />
          )}
        </div>
      )}
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