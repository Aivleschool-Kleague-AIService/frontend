import { useEffect, useState } from "react";
import MatchMetaBar from "../components/match/MatchMetaBar";
import MatchSummary from "../components/match/MatchSummary";
import TimeController from "../components/match/TimeController";
import { probabilityTimeline } from "../data/mockProbability";

function MatchDetailPage() {
  const [minute, setMinute] = useState(0);
  const [playing, setPlaying] = useState(false);

  // 재생 로직
  useEffect(() => {
    if (!playing) return;

    const timer = setInterval(() => {
      setMinute((prev) => {
        if (prev >= 90) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 500); // 0.5초 = 1분

    return () => clearInterval(timer);
  }, [playing]);

  const currentProb = probabilityTimeline[minute];

  return (
    <div style={{ minHeight: "100vh", background: "#1c1c1c", color: "#fff" }}>
      <MatchMetaBar />

      <MatchSummary probability={currentProb} />

      <TimeController
        minute={minute}
        playing={playing}
        onToggle={() => setPlaying((p) => !p)}
      />
    </div>
  );
}

export default MatchDetailPage;