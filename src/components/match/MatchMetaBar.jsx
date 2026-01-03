function MatchMetaBar() {
    return (
      <div style={styles.bar}>
        <span>시즌 <strong>2025</strong></span>
        <span className="divider">|</span>
        <span>리그 <strong>K리그1</strong></span>
        <span className="divider">|</span>
        <span>라운드 <strong>1</strong></span>
        <span className="divider">|</span>
        <span>경기 <strong>포항 vs 대전 (02/15)</strong></span>
      </div>
    );
  }
  
  const styles = {
    bar: {
      display: "flex",
      gap: "16px",
      padding: "12px 24px",
      background: "#111",
      fontSize: "14px",
      opacity: 0.9,
    },
  };
  
  export default MatchMetaBar;