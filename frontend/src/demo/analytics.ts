export const demoHistoricalCpu = Array.from({ length: 15 }, (_, i) => ({
  time: `${i + 9}:00`,
  value: [45, 55, 68, 72, 60, 52, 48, 64, 75, 80, 88, 70, 65, 67, 67][i],
}));

export const demoHistoricalMemory = Array.from({ length: 15 }, (_, i) => ({
  time: `${i + 9}:00`,
  value: [60, 62, 65, 67, 69, 70, 71, 72, 72, 73, 74, 73, 72, 72, 72][i],
}));

export const demoHistoricalQueue = Array.from({ length: 15 }, (_, i) => ({
  time: `${i + 9}:00`,
  ready: [2, 3, 5, 8, 4, 3, 2, 4, 6, 8, 12, 6, 4, 3, 3][i],
  waiting: [1, 2, 2, 4, 3, 2, 1, 2, 3, 4, 6, 3, 2, 1, 1][i],
  completed: [10, 25, 45, 70, 95, 120, 140, 165, 190, 220, 250, 265, 275, 280, 287][i],
}));
