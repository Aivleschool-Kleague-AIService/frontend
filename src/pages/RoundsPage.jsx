import { useEffect, useState } from "react";
import RoundSelector from "../components/RoundSelector";
import MatchList from "../components/MatchList";
import { getRounds } from "../api/roundApi";
import { getMatchesByRound } from "../api/matchApi";

function RoundsPage() {
  const [rounds, setRounds] = useState([]);
  const [selectedRoundId, setSelectedRoundId] = useState(null);
  const [matches, setMatches] = useState([]);

  // 1️⃣ 라운드 목록
  useEffect(() => {
    const fetchRounds = async () => {
      try {
        const data = await getRounds();
        setRounds(data);

        if (data.length > 0) {
          setSelectedRoundId(data[0].roundId);
        }
      } catch (e) {
        console.error("rounds fetch error", e);
      }
    };

    fetchRounds();
  }, []);

  // 2️⃣ 선택된 라운드의 경기 목록
  useEffect(() => {
    if (!selectedRoundId) return;

    const fetchMatches = async () => {
      try {
        const data = await getMatchesByRound(selectedRoundId);
        console.log("matches data:", data); // 🔥 확인용
        setMatches(data);
      } catch (e) {
        console.error("matches fetch error", e);
        setMatches([]);
      }
    };

    fetchMatches();
  }, [selectedRoundId]);

  return (
    <div>
      <h1>Rounds Page</h1>

      <RoundSelector
        rounds={rounds}
        selectedRoundId={selectedRoundId}
        onChangeRound={setSelectedRoundId}
      />

      <h2>경기 목록</h2>
      <MatchList matches={matches} />
    </div>
  );
}

export default RoundsPage;