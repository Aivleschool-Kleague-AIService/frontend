function RoundSelector({ rounds, selectedRoundId, onChangeRound }) {
  if (!rounds || rounds.length === 0) {
    return <p>라운드 없음</p>; // 🔥 이거 꼭 넣어
  }

  return (
    <div>
      <select
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