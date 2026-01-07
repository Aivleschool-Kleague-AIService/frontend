import TeamStatsCard from "./TeamStatsCard";

function TeamStatsSection({ match, stats }) {
  return (
    <div style={styles.wrapper}>
      <TeamStatsCard
        team={match.homeTeam}
        stats={stats.home}
        align="left"
      />

      <TeamStatsCard
        team={match.awayTeam}
        stats={stats.away}
        align="right"
      />
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    marginTop: "32px",
    borderTop: "1px solid #333",
  },
};

export default TeamStatsSection;