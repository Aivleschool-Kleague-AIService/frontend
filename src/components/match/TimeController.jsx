function TimeController() {
    return (
      <div style={styles.wrapper}>
        <button style={styles.button}>▶ 재생</button>
        <span style={styles.time}>0'</span>
      </div>
    );
  }
  
  const styles = {
    wrapper: {
      marginTop: "32px",
      display: "flex",
      justifyContent: "center",
      gap: "16px",
    },
    button: {
      padding: "8px 16px",
      cursor: "pointer",
    },
    time: {
      fontSize: "16px",
    },
  };
  
  export default TimeController;