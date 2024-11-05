import { json } from "express";
import client from "./client";

const API_KEY = VISUAL_CROSSING_API_KEY;
const baseUrl =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
// create Redis
const createCache = async (location) => {
  const cacheKey = `weather${location}`;
  const data = await client.get(cacheKey);
  return data ? JSON.parse(data) : null;
};

// fetch from the weather Api

const fetchWeather = async (location) => {
  const url = `${baseUrl}/${location}?/key=${API_KEY}`;
  const response = await fetch(url);
  return response;
};
