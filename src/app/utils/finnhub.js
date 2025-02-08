export const fetchStockData = async (symbol) => {
  try {
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`;
    console.log('Fetching:', url); // Debugging

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      console.error('API Error:', data);
      throw new Error(
        `Failed to fetch stock data: ${data.error || 'Unknown error'}`
      );
    }

    console.log('API Response:', data); // Debugging
    return data;
  } catch (error) {
    console.error('FetchStockData Error:', error);
    return null;
  }
};
