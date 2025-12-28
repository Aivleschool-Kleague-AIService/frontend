import { useParams } from "react-router-dom";

function MatchDetailPage() {
  const { matchId } = useParams();

  return (
    <div style={{ color: "#fff", padding: "16px" }}>
      <h2>Match Detail</h2>
      <p>matchId: {matchId}</p>
      <p>(분석 페이지는 추후 구현)</p>
    </div>
  );
}

export default MatchDetailPage;