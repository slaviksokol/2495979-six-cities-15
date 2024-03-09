export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRatingWidth(rating: number): string {
  return `${rating * (100 / 5)}%`;
}
