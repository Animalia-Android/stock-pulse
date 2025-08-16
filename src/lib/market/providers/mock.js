export async function mockQuote(symbol) {
  const asciiSum = symbol
    .split('')
    .reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  const basePrice = (asciiSum % 300) + 20;
  const priceChange =
    Math.round(basePrice * 0.01 * Math.sin(basePrice) * 100) / 100;
  const percentChange = Math.round((priceChange / basePrice) * 10000) / 100;

  return {
    symbol,
    price: parseFloat((basePrice + priceChange).toFixed(2)),
    change: priceChange,
    percentChange,
    open: basePrice,
    high: basePrice + 3,
    low: basePrice - 3,
    previousClose: basePrice - 1,
  };
}
