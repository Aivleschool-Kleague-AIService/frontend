import MatchListHeader from "./MatchListHeader";
import RoundHeader from "./RoundHeader";
import MatchRow from "./MatchRow";

function RoundSection({ round, matches }) {
  return (
    <section>
      <MatchListHeader />

      {matches.map(match => (
        <MatchRow key={match.matchId} match={match} />
      ))}
    </section>
  );
}

export default RoundSection;