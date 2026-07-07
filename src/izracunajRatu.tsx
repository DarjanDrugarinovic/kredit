export function izracunajRatu(P: number, r: number, n: number) {
  const monthlyRate = r / 12;
  const A =
    (P * (monthlyRate * Math.pow(1 + monthlyRate, n))) /
    (Math.pow(1 + monthlyRate, n) - 1);
  return A;
}
