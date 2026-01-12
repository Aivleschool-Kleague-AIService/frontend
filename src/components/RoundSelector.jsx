import "./RoundSelector.css";

function RoundSelector({ rounds, selectedRoundId, onChangeRound }) {
  const currentIndex = rounds.findIndex(
    (r) => r.roundId === selectedRoundId
  );

  const handlePrev = () => {
    if (currentIndex > 0) {
      onChangeRound(rounds[currentIndex - 1].roundId);
    }
  };

  const handleNext = () => {
    if (currentIndex < rounds.length - 1) {
      onChangeRound(rounds[currentIndex + 1].roundId);
    }
  };

  const handleCurrent = () => {
    if (rounds.length > 0) {
      onChangeRound(rounds[0].roundId);
    }
  };

  return (
    <div className="round-bar">
      {/* YEAR */}
      <div className="round-box">
        <span>2024</span>
        <span className="caret">▼</span>
      </div>

      {/* ROUND SELECT */}
      <div className="round-box">
        <select
          value={selectedRoundId ?? ""}
          onChange={(e) => onChangeRound(Number(e.target.value))}
        >
          {rounds.map((r) => (
            <option key={r.roundId} value={r.roundId}>
              {String(r.roundNumber).padStart(2, "0")}
            </option>
          ))}
        </select>
        <span className="caret">▼</span>
      </div>

      {/* ARROWS */}
      <div className="round-arrows">
        <button onClick={handlePrev}>◀</button>
        <button onClick={handleNext}>▶</button>
      </div>

      {/* NOW */}
      <button className="round-now" onClick={handleCurrent}>
        현재
      </button>
    </div>
  );
}

export default RoundSelector;