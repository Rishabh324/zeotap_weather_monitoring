"use client";

const Summary = ({ data }: { data: any }) => {
  if (!data) return null;

  let averageTemperature = data[0].main.temp;
  let maxTemperature = data[0].main.temp_max;
  let minTemperature = data[0].main.temp_min;
  let dominantCondition = data[0].weather[0].main;

  return (
    <div className="mt-8 p-4 bg-blue-200 rounded-xl shadow-blue-500 shadow-md">
      <h2 className="text-xl font-bold">Daily Weather Summary</h2>
      <div className="text-lg">
        <p>Average Temperature: {averageTemperature?.toFixed(2)}°C</p>
        <p>Max Temperature: {maxTemperature?.toFixed(2)}°C</p>
        <p>Min Temperature: {minTemperature?.toFixed(2)}°C</p>
        <p>Dominant Condition: {dominantCondition}</p>
      </div>
    </div>
  );
};

export default Summary;
