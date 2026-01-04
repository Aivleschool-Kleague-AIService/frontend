export const probabilityTimeline = Array.from({ length: 91 }, (_, minute) => {
    const homeWin = Math.max(10, 50 + Math.sin(minute / 10) * 20);
    const draw = 30;
    const awayWin = Math.max(10, 100 - homeWin - draw);
  
    return {
      minute,
      home: homeWin,
      draw,
      away: awayWin,
  
      // ⭐ 골 확률 분리
      homeGoal: Math.min(80, Math.max(5, 25 + Math.sin(minute / 6) * 15)),
      awayGoal: Math.min(80, Math.max(5, 20 + Math.cos(minute / 7) * 15)),
    };
  });