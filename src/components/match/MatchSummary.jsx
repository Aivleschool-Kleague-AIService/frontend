import WinProbabilityBar from "./WinProbabilityBar";

function MatchSummary({ probability }) {
  // ✅ 안전장치 (매우 중요)
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

      {/* ⭐ 핵심 승률 바 */}
      <WinProbabilityBar
        home={probability.home}
        draw={probability.draw}
        away={probability.away}
        minute={probability.minute}
      />
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