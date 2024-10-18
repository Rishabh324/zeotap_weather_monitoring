
import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY!;

const fetchWeatherData = async (city: string) => {
  const response = await axios.get(BASE_URL, {
    params: {
      appid: API_KEY,
      q: city
    }
  });
  return response.data;
};

export default fetchWeatherData;
