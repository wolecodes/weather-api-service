// Get a weather data
/**
 * getWeather
 * @param location - takes a weather location (city-code)
 * return a weather data
 */

export const getWeather = async (req, res) => {
  const { location } = req;

  if (!location) {
    return res.status(400).json({
      success: false,
      eror: "Location is required",
    });
  }
  const result = await getWeather(location);

  res.json({ data: result });
};
