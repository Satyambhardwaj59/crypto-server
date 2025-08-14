const axios = require('axios');

async function fetchCoinData() {
    try {
        const { data } = await axios.get(
            'https://api.coingecko.com/api/v3/coins/markets',
            {
                params: {
                    vs_currency: 'usd',
                    order: 'market_cap_desc',
                    per_page: 10,
                    page: 1,
                    sparkline: false
                }
            }
        );

        return data.map(coin => ({
            coin_id: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            price_usd: coin.current_price,
            market_cap: coin.market_cap,
            change_24h: coin.price_change_percentage_24h
        }));
    } catch (error) {
        console.error("fetchCoinData failed:", error.message);
        throw new Error("fetchCoinData failed");
    }
}

module.exports = { fetchCoinData };
