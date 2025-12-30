import styles from "./RoundSelector.module.css";

function RoundSelector({ rounds, selectedRoundId, onChangeRound }) {
  return (
    <div className={styles.wrapper}>
      <select
        className={styles.select}
        value={selectedRoundId ?? ""}
        onChange={(e) => onChangeRound(Number(e.target.value))}
      >
        {rounds.map((round) => (
          <option key={round.roundId} value={round.roundId}>
            {round.roundNumber}R | {round.startDate} ~ {round.endDate}
          </option>
        ))}
      </select>
    </div>
  );
}

export default RoundSelector;