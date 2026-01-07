function TeamStatsTable({ match, stats }) {
    return (
      <div style={styles.wrapper}>
        <h3 style={styles.title}>팀 비교 분석</h3>
  
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.metricHeader}></th>
  
              <th style={styles.teamHeader}>
                <img
                  src={match.homeTeam.logoUrl}
                  alt={match.homeTeam.name}
                  style={styles.logo}
                />
                <div style={styles.teamName}>{match.homeTeam.name}</div>
              </th>
  
              <th style={styles.teamHeader}>
                <img
                  src={match.awayTeam.logoUrl}
                  alt={match.awayTeam.name}
                  style={styles.logo}
                />
                <div style={styles.teamName}>{match.awayTeam.name}</div>
              </th>
            </tr>
          </thead>
  
          <tbody>
          <tr>
            <td style={styles.metric}>AI 예측 승률</td>
            <td style={styles.value}>{stats.home.winRate}%</td>
            <td style={styles.value}>{stats.away.winRate}%</td>
            </tr>
            <tr>
              <td style={styles.metric}>팀 컬러</td>
              <td style={styles.value}>{stats.home.color}</td>
              <td style={styles.value}>{stats.away.color}</td>
            </tr>
            <tr>
              <td style={styles.metric}>공격력</td>
              <td style={styles.value}>{stats.home.attack}</td>
              <td style={styles.value}>{stats.away.attack}</td>
            </tr>
            <tr>
              <td style={styles.metric}>수비력</td>
              <td style={styles.value}>{stats.home.defense}</td>
              <td style={styles.value}>{stats.away.defense}</td>
            </tr>
            <tr>
              <td style={styles.metric}>패스 성공률</td>
              <td style={styles.value}>{stats.home.pass}%</td>
              <td style={styles.value}>{stats.away.pass}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  
  const styles = {
    wrapper: {
      marginTop: "48px",
      padding: "24px",
      background: "#2a2a2a",
      borderRadius: "8px",
    },
    title: {
      marginBottom: "16px",
      fontSize: "20px",
      fontWeight: "bold",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      background: "#2a2a2a",
      fontSize: "16px",
    },
    metricHeader: {
      width: "20%",
    },
    teamHeader: {
      width: "40%",
      padding: "16px 0",
      textAlign: "center",
      borderBottom: "1px solid #333",
    },
    logo: {
      width: "48px",
      height: "48px",
      marginBottom: "8px",
    },
    teamName: {
      fontSize: "18px",
      fontWeight: "bold",
    },
    metric: {
      padding: "14px",
      textAlign: "center",
      fontWeight: "bold",
      borderTop: "1px solid #333",
    },
    value: {
      padding: "14px",
      textAlign: "center",
      borderTop: "1px solid #333",
      fontSize: "18px",
    },
  };
  
  export default TeamStatsTable;