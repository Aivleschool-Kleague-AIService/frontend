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

  const currentRound = rounds.find(
    (r) => r.roundId === selectedRoundId
  );

  const currentIndex = rounds.findIndex(
    (r) => r.roundId === selectedRoundId
  );

  const handlePrevRound = () => {
    if (currentIndex > 0) {
      setSelectedRoundId(rounds[currentIndex - 1].roundId);
    }
  };

  const handleNextRound = () => {
    if (currentIndex < rounds.length - 1) {
      setSelectedRoundId(rounds[currentIndex + 1].roundId);
    }
  };

  return (
    <div style={{ background: "#000", minHeight: "100vh", padding: "24px" }}>
      {/* 제목 */}
      <h1 style={{ color: "#fff", textAlign: "center", marginBottom: "16px" }}>
        {currentRound ? `${currentRound.roundNumber}R 경기 일정` : "경기 일정"}
      </h1>

      {/* 라운드 컨트롤 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        <button
          onClick={handlePrevRound}
          disabled={currentIndex <= 0}
          style={{
            padding: "6px 10px",
            cursor: "pointer",
          }}
        >
          ◀
        </button>

        <RoundSelector
          rounds={rounds}
          selectedRoundId={selectedRoundId}
          onChangeRound={setSelectedRoundId}
        />

        <button
          onClick={handleNextRound}
          disabled={currentIndex >= rounds.length - 1}
          style={{
            padding: "6px 10px",
            cursor: "pointer",
          }}
        >
          ▶
        </button>
      </div>

      {loading && <div style={{ color: "#aaa" }}>로딩 중...</div>}

      {!loading && currentRound && (
        <RoundSection
          round={currentRound}
          matches={matches.map((match) => ({
            ...match,
            round: currentRound,
          }))}
        />
      )}
    </div>
  );
}

export default RoundsPage;