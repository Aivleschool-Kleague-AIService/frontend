function GoalProbabilityBar({ label, value, color }) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <span>{label}</span>
          <span>{value.toFixed(0)}%</span>
        </div>
  
        <div style={styles.bar}>
          <div
            style={{
              ...styles.fill,
              width: `${value}%`,
              background: color,
            }}
          />
        </div>
      </div>
    );
  }
  
  const styles = {
    container: {
      maxWidth: "600px",
      margin: "10px auto 0",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "13px",
      marginBottom: "4px",
      opacity: 0.9,
    },
    bar: {
      height: "12px",
      background: "#444",
      borderRadius: "6px",
      overflow: "hidden",
    },
    fill: {
      height: "100%",
      transition: "width 0.4s ease",
    },
  };
  
  export default GoalProbabilityBar;