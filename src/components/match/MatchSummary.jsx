import WinProbabilityBar from "./WinProbabilityBar";
import GoalProbabilityBar from "./GoalProbabilityBar";
import styles from "./MatchSummary.module.css";

function MatchSummary({ match, probability }) {
  if (!match) return null;

  const time = probability?.minute ?? probability?.time ?? 0;

  const homeWin = probability?.home ?? null;
  const drawWin = probability?.draw ?? null;
  const awayWin = probability?.away ?? null;

  const homeGoal =
    probability?.homeGoalProbability ??
    probability?.homeGoal ??
    null;

  const awayGoal =
    probability?.awayGoalProbability ??
    probability?.awayGoal ??
    null;

  return (
    <div className={styles.summary}>
      <WinProbabilityBar
        home={homeWin}
        draw={drawWin}
        away={awayWin}
        minute={time}
      />

      {(homeGoal != null || awayGoal != null) && (
        <section className={styles.goalSection}>
          <h2 className={styles.goalTitle}>다음 득점 확률</h2>
          {homeGoal != null && (
            <GoalProbabilityBar
              label={`${match.homeTeam.name} 득점`}
              value={homeGoal}
              variant="home"
            />
          )}
          {awayGoal != null && (
            <GoalProbabilityBar
              label={`${match.awayTeam.name} 득점`}
              value={awayGoal}
              variant="away"
            />
          )}
        </section>
      )}
    </div>
  );
}

export default MatchSummary;
