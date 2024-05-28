export function formatBalance(balance: number): string {
  if (balance >= 1_000_000_000) {
    return (balance / 1_000_000_000).toFixed(1) + "B";
  } else if (balance >= 1_000_000) {
    return (balance / 1_000_000).toFixed(1) + "M";
  } else {
    return balance.toFixed(2);
  }
}