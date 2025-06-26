const axios = require('axios');

async function fetchDataFromAPI(url) {
  try {
    const response = await axios.get(url);
    console.log("API Data:", response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

module.exports = fetchDataFromAPI;
