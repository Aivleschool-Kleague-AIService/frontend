import styles from "./RoundSelector.module.css";

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

  const currentRound = rounds[currentIndex];

  return (
    <section className={styles.selector} aria-label="라운드 선택">
      <button
        className={styles.directionButton}
        type="button"
        onClick={handlePrev}
        disabled={currentIndex <= 0}
        aria-label="이전 라운드"
      >
        <span aria-hidden="true">←</span>
      </button>

      <div className={styles.roundInfo}>
        <span className={styles.label}>2024 시즌</span>
        <div className={styles.selectWrapper}>
          <label className={styles.srOnly} htmlFor="round-select">
            라운드
          </label>
        <select
          id="round-select"
          className={styles.select}
          value={selectedRoundId ?? ""}
          onChange={(e) => onChangeRound(Number(e.target.value))}
        >
          {rounds.map((r) => (
            <option key={r.roundId} value={r.roundId}>
              {r.roundNumber} ROUND
            </option>
          ))}
        </select>
          <span className={styles.caret} aria-hidden="true">⌄</span>
        </div>
        {currentRound && (
          <span className={styles.period}>
            {currentRound.startDate.replace(/-/g, ".")} – {currentRound.endDate.replace(/-/g, ".")}
          </span>
        )}
      </div>

      <button
        className={styles.directionButton}
        type="button"
        onClick={handleNext}
        disabled={currentIndex >= rounds.length - 1}
        aria-label="다음 라운드"
      >
        <span aria-hidden="true">→</span>
      </button>

      <button className={styles.currentButton} type="button" onClick={handleCurrent}>
        첫 라운드
      </button>
    </section>
  );
}

export default RoundSelector;
