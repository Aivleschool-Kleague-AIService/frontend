function RoundSelector({ selectedRound, onChangeRound }) {
  return (
    <div>
      <label>
        라운드 선택:{" "}
        <select
          value={selectedRound}
          onChange={(e) => onChangeRound(e.target.value)}
        >
          <option value="1R">1R | 03.02 ~ 03.04</option>
          <option value="2R">2R | 03.08 ~ 03.10</option>
          <option value="3R">3R | 03.15 ~ 03.17</option>
        </select>
      </label>
    </div>
  );
}

export default RoundSelector;