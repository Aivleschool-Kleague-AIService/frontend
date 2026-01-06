function MatchMetaBar({ match }) {
  if (!match) return null;

  const season = 2024;
  const league = "K리그1";
  const roundNumber = match.round?.roundNumber ?? "-";

  const homeShort = match.homeTeam.name.slice(0, 2);
  const awayShort = match.awayTeam.name.slice(0, 2);

  const d = new Date(match.matchDate);
  const dateText = `${String(d.getMonth() + 1).padStart(2, "0")}/${String(
    d.getDate()
  ).padStart(2, "0")}`;

  return (
    <div style={styles.bar}>
      <span>시즌 <strong>{season}</strong></span>
      <span>|</span>
      <span>리그 <strong>{league}</strong></span>
      <span>|</span>
      <span>라운드 <strong>{roundNumber}</strong></span>
      <span>|</span>
      <span>
        경기{" "}
        <strong>
          {homeShort} vs {awayShort} ({dateText})
        </strong>
      </span>
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