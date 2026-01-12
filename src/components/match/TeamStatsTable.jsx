function TeamStatsTable({ match, stats }) {
  if (!match || !stats) return null;

  const toPercent = (v) =>
    v === null || v === undefined ? "-" : `${Math.round(v * 100)}%`;

  return (
    <div style={styles.wrapper}>
      <h3 style={styles.title}>팀 비교 분석</h3>

      <div style={styles.tableContainer}>
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
              <td style={styles.metric}>팀 컬러</td>
              <td style={styles.value}>{stats.home.teamColor}</td>
              <td style={styles.value}>{stats.away.teamColor}</td>
            </tr>

            <tr>
              <td style={styles.metric}>공격 성공률</td>
              <td style={styles.value}>
                {toPercent(stats.home.attack)}
              </td>
              <td style={styles.value}>
                {toPercent(stats.away.attack)}
              </td>
            </tr>

            <tr>
              <td style={styles.metric}>수비 성공률</td>
              <td style={styles.value}>
                {toPercent(stats.home.defense)}
              </td>
              <td style={styles.value}>
                {toPercent(stats.away.defense)}
              </td>
            </tr>

            <tr>
              <td style={styles.metric}>패스 성공률</td>
              <td style={styles.value}>
                {toPercent(stats.home.pass)}
              </td>
              <td style={styles.value}>
                {toPercent(stats.away.pass)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    marginTop: "48px",
    padding: "32px",
    background: "#2a2a2a",
    borderRadius: "8px",
  },
  title: {
    marginBottom: "18px",
    fontSize: "21px",
    fontWeight: "bold",
    textAlign: "center",
  },
  tableContainer: {
    maxWidth: "860px",
    margin: "0 auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#2a2a2a",
    fontSize: "15px",
  },
  metricHeader: {
    width: "22%",
  },
  teamHeader: {
    width: "39%",
    padding: "14px 0",
    textAlign: "center",
    borderBottom: "1px solid #333",
  },
  logo: {
    width: "44px",
    height: "44px",
    marginBottom: "6px",
  },
  teamName: {
    fontSize: "15px",
    fontWeight: "bold",
  },
  metric: {
    padding: "12px",
    textAlign: "center",
    fontWeight: "600",
    borderTop: "1px solid #333",
    fontSize: "14px",
    opacity: 0.9,
  },
  value: {
    padding: "12px",
    textAlign: "center",
    borderTop: "1px solid #333",
    fontSize: "15px",
    color: "#fff",
  },
};

export default TeamStatsTable;