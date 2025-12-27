function MatchList({ matches }) {
  if (!matches || matches.length === 0) {
    return <p>해당 라운드에 경기가 없습니다.</p>;
  }

  return (
    <ul>
      {matches.map((match) => (
        <li key={match.matchId}>
          {match.homeTeam.name} vs {match.awayTeam.name}  
          ({match.finalScore.home} : {match.finalScore.away})  
          - {match.matchDateTime}
        </li>
      ))}
    </ul>
  );
}

export default MatchList;