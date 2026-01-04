function TimeController({
  minute,
  playing,
  onToggle,
  onReset,
  onChangeMinute, // ✅ [추가]
}) {
  return (
    <div style={styles.wrapper}>
      <button style={styles.button} onClick={onToggle}>
        {playing ? "⏸ 정지" : "▶ 재생"}
      </button>

      <button style={styles.resetButton} onClick={onReset}>
        ⏮ 초기화
      </button>

      {/* ✅ [추가] 타임 슬라이더 */}
      <input
        type="range"
        min="0"
        max="90"
        value={minute}
        onChange={(e) => onChangeMinute(Number(e.target.value))}
        style={styles.slider}
      />

      <span style={styles.time}>{minute}'</span>
    </div>
  );
}

const styles = {
  wrapper: {
    marginTop: "32px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
  },
  button: {
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "14px",
  },
  resetButton: {
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "14px",
    background: "#333",
    color: "#fff",
    border: "1px solid #555",
  },
  slider: {
    width: "240px",
  },
  time: {
    marginLeft: "8px",
    fontSize: "16px",
    opacity: 0.9,
  },
};

export default TimeController;