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
    if (!playing || minute >= 90) return;

    const timer = setInterval(() => {
      setMinute((prev) => prev + 1);
    }, 500);

    return () => clearInterval(timer);
  }, [playing, minute]);

  const currentProb = probabilityTimeline[minute];

  const handleTogglePlay = () => {
    if (minute >= 90) setMinute(0);
    setPlaying((p) => !p);
  };

  const handleReset = () => {
    setPlaying(false);
    setMinute(0);
  };

  // ✅ [추가] 슬라이더로 minute 변경
  const handleChangeMinute = (value) => {
    setPlaying(false);   // 슬라이더 조작 시 재생 중지
    setMinute(value);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#1c1c1c", color: "#fff" }}>
      <MatchMetaBar />
      <MatchSummary probability={currentProb} />
      <TimeController
        minute={minute}
        playing={playing}
        onToggle={handleTogglePlay}
        onReset={handleReset}
        onChangeMinute={handleChangeMinute}
      />
    </div>
  );
}

export default MatchDetailPage;