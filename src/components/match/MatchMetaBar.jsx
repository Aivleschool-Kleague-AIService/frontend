function MatchMetaBar({
  match,
  minute,
  playing,
  onToggle,
  onReset,
  onChangeMinute,
}) {
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
    <div>
      {/* 🔹 기존 상단 정보 (유지) */}
      <div style={styles.infoBar}>
        <span>시즌 <strong>{season}</strong></span>
        <span>|</span>
        <span>리그 <strong>{league}</strong></span>
        <span>|</span>
        <span>라운드 <strong>{roundNumber}</strong></span>
        <span>|</span>
        <span>
          경기 <strong>{homeShort} vs {awayShort} ({dateText})</strong>
        </span>
      </div>

      {/* 🔹 컨트롤 바 (새로 추가) */}
      <div style={styles.controlBar}>
        <button onClick={onToggle}>
          {playing ? "⏸ 정지" : "▶ 재생"}
        </button>

        <button onClick={onReset}>⏮ 초기화</button>

        <span>{minute}'</span>

        <input
          type="range"
          min={0}
          max={90}
          value={minute}
          onChange={(e) => onChangeMinute(Number(e.target.value))}
          style={styles.slider}
        />
      </div>
    </div>
  );
}

const styles = {
  infoBar: {
    display: "flex",
    gap: "16px",
    padding: "12px 24px",
    background: "#111",
    fontSize: "14px",
    opacity: 0.9,
    borderBottom: "1px solid #333",
  },

  // ✅ 여기 수정
  controlBar: {
    display: "flex",
    justifyContent: "center",   // ⬅ 가운데 정렬
    alignItems: "center",
    gap: "12px",
    padding: "10px 24px",
    background: "#1a1a1a",
    borderBottom: "1px solid #333",
  },

  slider: {
    width: "240px",
  },
};

export default MatchMetaBar;