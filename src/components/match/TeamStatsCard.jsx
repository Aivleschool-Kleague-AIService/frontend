function TeamStatsCard({ team, stats, align = "left" }) {
    return (
      <div style={{ ...styles.card, textAlign: align }}>
        <div style={styles.header}>
          <img src={team.logoUrl} alt={team.name} style={styles.logo} />
          <strong>{team.name}</strong>
        </div>
  
        <div style={styles.row}>팀컬러 <span>{stats.color}</span></div>
        <div style={styles.row}>공격력 <span>{stats.attack}</span></div>
        <div style={styles.row}>수비력 <span>{stats.defense}</span></div>
        <div style={styles.row}>패스확률 <span>{stats.pass}%</span></div>
      </div>
    );
  }
  
  const styles = {
    card: {
      width: "50%",
      padding: "16px",
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "12px",
    },
    logo: {
      width: "32px",
      height: "32px",
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "6px",
      opacity: 0.9,
    },
  };
  
  export default TeamStatsCard;