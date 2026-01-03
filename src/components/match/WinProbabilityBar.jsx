function WinProbabilityBar() {
    // 더미 값 (나중에 AI 데이터로 교체)
    const home = 33;
    const draw = 34;
    const away = 33;
  
    return (
      <div style={styles.container}>
        <div style={styles.bar}>
          <div style={{ ...styles.home, width: `${home}%` }} />
          <div style={{ ...styles.draw, width: `${draw}%` }} />
          <div style={{ ...styles.away, width: `${away}%` }} />
        </div>
  
        <div style={styles.label}>
          홈 {home}% | 무 {draw}% | 원정 {away}%
        </div>
      </div>
    );
  }
  
  const styles = {
    container: {
      maxWidth: "600px",
      margin: "0 auto",
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
    },
  };
  
  export default WinProbabilityBar;