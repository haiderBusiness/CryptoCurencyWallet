// Replace with your API key from your chosen currency API provider


// Fetch currency exchange rates
export const fetchExchangeRates = async () => {


    // only fiat currencies and monthly limited

    const API_KEY = 'YOUR_API_KEY';  // Replace with your real API key
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

    try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.conversion_rates
    } catch (error) {
    console.error('Error fetching exchange rates:', error);
    }
};



export const fetchAllCryptoRates = async () => {

  
    // const API_URL = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,usd-coin&vs_currencies=usd`;

    const API_URL = "https://api.coingecko.com/api/v3/exchange_rates"

    try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data
    } catch (error) {
    console.error('Error fetching exchange rates:', error);
    }
};

