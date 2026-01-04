import WinProbabilityBar from "./WinProbabilityBar";
import GoalProbabilityBar from "./GoalProbabilityBar";

function MatchSummary({ probability }) {
  if (!probability) return null;

  return (
    <div style={styles.wrapper}>
      <div style={styles.date}>2025/02/15 (토) 13:00</div>

      <div style={styles.scoreRow}>
        <div style={styles.team}>
          <img src="/default-team.png" alt="" style={styles.logo} />
          <span>포항 스틸러스</span>
        </div>

        <div style={styles.score}>0 - 3</div>

        <div style={styles.team}>
          <span>대전 하나 시티즌</span>
          <img src="/default-team.png" alt="" style={styles.logo} />
        </div>
      </div>

      {/* 승률 분포 */}
      <WinProbabilityBar
        home={probability.home}
        draw={probability.draw}
        away={probability.away}
        minute={probability.minute}
      />

      {/* ⭐ 골 확률 (홈 / 원정) */}
      <div style={{ marginTop: "20px" }}>
        <GoalProbabilityBar
          label="홈팀 골 확률"
          value={probability.homeGoal}
          color="#e74c3c"
        />
        <GoalProbabilityBar
          label="원정팀 골 확률"
          value={probability.awayGoal}
          color="#3498db"
        />
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
  },
  score: {
    fontSize: "36px",
    fontWeight: "bold",
  },
};

export default MatchSummary;