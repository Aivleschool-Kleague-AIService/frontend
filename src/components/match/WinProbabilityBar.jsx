function WinProbabilityBar({ home, draw, away, minute }) {
  return (
    <div style={styles.container}>
      {/* ✅ [추가] 그래프 설명 라벨 */}
      <div style={styles.title}>
        승리 확률 <span style={styles.minute}>({minute}분)</span>
      </div>

      {/* 확률 바 */}
      <div style={styles.bar}>
        <div style={{ ...styles.home, width: `${home}%` }} />
        <div style={{ ...styles.draw, width: `${draw}%` }} />
        <div style={{ ...styles.away, width: `${away}%` }} />
      </div>

      {/* 수치 라벨 */}
      <div style={styles.label}>
        홈 {home.toFixed(0)}% | 무 {draw.toFixed(0)}% | 원정{" "}
        {away.toFixed(0)}%
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "24px auto 0",
  },
  title: {
    marginBottom: "6px",
    fontSize: "14px",
    fontWeight: "bold",
    opacity: 0.95,
    textAlign: "center",
  },
  minute: {
    fontSize: "12px",
    opacity: 0.7,
    marginLeft: "4px",
  },
  bar: {
    display: "flex",
    height: "20px",
    borderRadius: "10px",
    overflow: "hidden",
    background: "#444",
  },
  home: {
    background: "#c0392b",
    transition: "width 0.4s ease",
  },
  draw: {
    background: "#7f8c8d",
    transition: "width 0.4s ease",
  },
  away: {
    background: "#16a085",
    transition: "width 0.4s ease",
  },
  label: {
    marginTop: "8px",
    fontSize: "14px",
    opacity: 0.9,
    textAlign: "center",
  },
};

export default WinProbabilityBar;