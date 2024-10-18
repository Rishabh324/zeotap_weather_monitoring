const WeatherCard = ({ data }: { data: any }) => {
  const temperature = data.main.temp;
  const feelsLike = data.main.feels_like;
  

  return (
    <div className="bg-blue-200 shadow-blue-500 rounded-xl shadow-md p-4">
      <h2 className="text-xl font-bold">{data.name}</h2>
      <div className="text-lg">
        <p>Temperature: {temperature.toFixed(2)}°C</p>
        <p>Feels Like: {feelsLike.toFixed(2)}°C</p>
        <p>Condition: {data.weather[0].main}</p>
        <p>Humidity: {data.main.humidity}%</p>
        <p>Wind Speed: {data.wind.speed} m/s</p>
      </div>
    </div>
  );
};

export default WeatherCard;
