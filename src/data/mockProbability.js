// minute별 확률 (지금은 더미, 나중에 AI로 교체)
export const probabilityTimeline = Array.from({ length: 91 }, (_, minute) => {
    return {
      minute,
      home: Math.max(10, 50 + Math.sin(minute / 10) * 20),
      draw: 30,
      away: Math.max(10, 100 - (50 + Math.sin(minute / 10) * 20) - 30),
    };
  });