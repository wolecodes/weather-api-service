import { compile } from "morgan";
import client from "./client.js";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.WEATHER_API_KEY;
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
  console.log(location);
  const url = `${baseUrl}/${location}/today?unitGroup=metric&key=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Unable to fetch data");
  }
  return response.json();
};

// Save to cache

const saveCache = async (location, data) => {
  const cacheKey = `weather${location}`;

  await client.setEx(cacheKey, 900, JSON.stringify(data)); // stringify if it's an object
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
    console.log(weatherData);
    await saveCache(location, weatherData);

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
