import { useEffect, useState } from "react";
import RoundSection from "../components/rounds/RoundSection";
import RoundSelector from "../components/RoundSelector";
import { getRounds } from "../api/roundApi";
import { getMatchesByRound } from "../api/matchApi";

function RoundsPage() {
  const [rounds, setRounds] = useState([]);
  const [selectedRoundId, setSelectedRoundId] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRounds = async () => {
      const data = await getRounds();
      setRounds(data);
      if (data.length > 0) setSelectedRoundId(data[0].roundId);
      setLoading(false);
    };
    fetchRounds();
  }, []);

  useEffect(() => {
    if (!selectedRoundId) return;
    getMatchesByRound(selectedRoundId).then(setMatches);
  }, [selectedRoundId]);

  const currentRound = rounds.find(r => r.roundId === selectedRoundId);

  return (
    <div style={{ background: "#000", minHeight: "100vh", padding: "16px" }}>
      <h1 style={{ color: "#fff" }}>Kleague 경기 일정</h1>

      <RoundSelector
        rounds={rounds}
        selectedRoundId={selectedRoundId}
        onChangeRound={setSelectedRoundId}
      />

      {loading && <div style={{ color: "#aaa" }}>로딩 중...</div>}

      {!loading && currentRound && (
        <RoundSection round={currentRound} matches={matches} />
      )}
    </div>
  );
}

export default RoundsPage;