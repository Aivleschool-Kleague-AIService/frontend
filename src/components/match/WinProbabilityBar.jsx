// src/components/match/WinProbabilityBar.jsx

function WinProbabilityBar({ home, draw, away, minute }) {
  // ❗ 전부 없으면 렌더링 X
  if (home == null && draw == null && away == null) return null;

  const h = Number(home) || 0;
  const d = Number(draw) || 0;
  const a = Number(away) || 0;

  const clamp = (v) => Math.max(0, Math.min(100, v));

  return (
    <div style={styles.container}>
      <div style={styles.title}>
        승리 확률
        {minute !== undefined && (
          <span style={styles.minute}> ({minute}분)</span>
        )}
      </div>

      <div style={styles.bar}>
        <div style={{ ...styles.home, width: `${clamp(h)}%` }} />
        <div style={{ ...styles.draw, width: `${clamp(d)}%` }} />
        <div style={{ ...styles.away, width: `${clamp(a)}%` }} />
      </div>

      <div style={styles.label}>
        홈 {h.toFixed(0)}% | 무 {d.toFixed(0)}% | 원정 {a.toFixed(0)}%
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