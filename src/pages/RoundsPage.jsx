import { useState } from "react";
import RoundSelector from "../components/RoundSelector";

function RoundsPage() {
  const [selectedRound, setSelectedRound] = useState("1R");

  return (
    <div>
      <h1>Rounds Page</h1>
      <p>여기는 K리그 라운드 목록 페이지입니다.</p>

      <RoundSelector
        selectedRound={selectedRound}
        onChangeRound={setSelectedRound}
      />

      <p>
        선택된 라운드: <b>{selectedRound}</b>
      </p>
    </div>
  );
}

export default RoundsPage;