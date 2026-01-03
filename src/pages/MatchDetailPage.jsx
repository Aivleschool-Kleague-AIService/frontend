import MatchMetaBar from "../components/match/MatchMetaBar";
import MatchSummary from "../components/match/MatchSummary";
import TimeController from "../components/match/TimeController";

function MatchDetailPage() {
  return (
    <div style={styles.page}>
      <MatchMetaBar />
      <MatchSummary />
      <TimeController />
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#1c1c1c",
    color: "#fff",
  },
};

export default MatchDetailPage;