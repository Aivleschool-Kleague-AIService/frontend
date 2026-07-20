import MatchCard from "./MatchCard";
import styles from "./RoundSection.module.css";

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  month: "long",
  day: "numeric",
  weekday: "long",
});

function getDateGroup(matchDate) {
  const date = new Date(matchDate);

  if (Number.isNaN(date.getTime())) {
    return { key: "unknown", label: "날짜 미정", timestamp: Infinity };
  }

  const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  return { key, label: dateFormatter.format(date), timestamp: date.getTime() };
}

function RoundSection({ round, matches }) {
  const groups = matches.reduce((result, match) => {
    const dateGroup = getDateGroup(match.matchDate);
    const existingGroup = result.get(dateGroup.key);

    if (existingGroup) {
      existingGroup.matches.push(match);
    } else {
      result.set(dateGroup.key, { ...dateGroup, matches: [match] });
    }

    return result;
  }, new Map());

  const sortedGroups = Array.from(groups.values()).sort(
    (first, second) => first.timestamp - second.timestamp
  );

  return (
    <section className={styles.section} aria-label={`${round.roundNumber}라운드 경기 목록`}>
      {sortedGroups.map((group) => (
        <section key={group.key}>
          <div className={styles.heading}>
            <h2 className={styles.date}>{group.label}</h2>
            <span className={styles.count}>{group.matches.length}경기</span>
          </div>
          <div className={styles.matches}>
            {group.matches.map((match) => (
              <MatchCard key={match.matchId} match={match} />
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}

export default RoundSection;
