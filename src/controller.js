import getWeather from "./weatherService.js";
// Get a weather data
/**
 * getWeather
 * @param location - takes a weather location (city-code)
 * return a weather data
 */

export default async function getWeatherData(req, res) {
  const { location } = req.params;



  if (!location) {
    return res.status(400).json({
      success: false,
      eror: "Location is required",
    });
  }
  const result = await getWeather(location);

  res.json({ data: result });
}
