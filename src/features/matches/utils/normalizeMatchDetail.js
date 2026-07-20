function normalizeTeam(team) {
  if (!team) return null;

  return {
    id: team.id ?? team.teamId ?? team.team_id ?? null,
    name: team.name ?? team.teamName ?? team.team_name ?? "",
    logoUrl: team.logoUrl ?? team.logo_url ?? "",
  };
}

export function normalizeMatchDetail(match) {
  if (!match) return null;

  const matchId = match.matchId ?? match.matchid;
  const homeTeam = normalizeTeam(match.homeTeam ?? match.home_team);
  const awayTeam = normalizeTeam(match.awayTeam ?? match.away_team);
  const roundNumber = match.roundNumber ?? match.round?.roundNumber ?? null;
  const finalScore = match.finalScore ?? match.final_score ?? {};

  if (matchId == null || !homeTeam || !awayTeam) return null;

  return {
    matchId,
    matchDate: match.matchDate ?? match.match_date ?? null,
    homeTeam,
    awayTeam,
    finalScore: {
      home: finalScore.home ?? null,
      away: finalScore.away ?? null,
    },
    round: roundNumber == null ? null : { roundNumber },
  };
}
