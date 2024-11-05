import client from "./client.js";

const API_KEY = VISUAL_CROSSING_API_KEY;
const baseUrl =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
// create Redis
const checkCache = async (location) => {
  const cacheKey = `weather${location}`;
  const data = await client.get(cacheKey);
  return data ? JSON.parse(data) : null;
};

// fetch from the weather Api

const fetchFromAPI = async (location) => {
  const url = `${baseUrl}/${location}?/key=${API_KEY}`;
  const response = await fetch(url);
  return response;
};

// Save to cache

const saveCache = async (location, data) => {
  const cacheKey = `weather${location}`;
  await client.setEx(cacheKey, 900, JSON.parse(data));
};

export default async function getWeather(location) {
  try {
    const cacheData = await checkCache(location);
    if (cacheData) {
      return {
        success: true,
        data: cacheData,
        source: "cache",
      };
    }
    const weatherData = await fetchFromAPI(location);
    await saveCache(weatherData);

    return {
      success: true,
      data: weatherData,
      source: "api",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}
