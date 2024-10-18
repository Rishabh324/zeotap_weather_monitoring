"use client";

import { useState, useEffect } from 'react';
import WeatherCard from '../components/WeatherCard';
import Summary from '../components/Summary';
import Alert from '../components/Alert';
import UserPreferences from '../components/UserPreferences';
import TrendsChart from '../components/TrendsChart';
import { usePreferences } from '../context/PreferencesContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Home = () => {
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [historicalData, setHistoricalData] = useState<any[]>([]);

  const {city, temperatureThreshold, weatherConditionThreshold} = usePreferences();
  
  const checkAlerts = (data: any): any[] => {
    if (!data) return [];
    
    const newAlerts: any[] = [];
    const temperature = data.main.temp;
    if (temperature > temperatureThreshold) {
      newAlerts.push({ message: `Temperature alert for ${data.name}: ${temperature.toFixed(2)}°C` });
    }

    if (data.weather[0].main === weatherConditionThreshold) {
      newAlerts.push({ message: `Weather alert for ${data.name}: ${data.weather[0].main}` });
    }

    return newAlerts;
  };

  const fetchInitialWeatherData = async () => {
    try {
      const { data } = await axios.get(`/api/weather`, {
        params: { city },
      });
      if (data) {
        console.log(data);
        setWeatherData([data]);
        setHistoricalData([data]);
        setSummary([data]);
      } else {
        console.error('Failed to fetch initial weather data');
        toast.error('Failed to fetch initial weather data');
        setWeatherData([]);
        setHistoricalData([]);
        setSummary(null);
      }
    } catch (err) {
      console.error('Failed to fetch weather data', err);
      toast.error('Failed to fetch weather data');
      setWeatherData([]);
      setHistoricalData([]);
      setSummary(null);
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const { data } = await axios.get(`/api/weather-updates`, {
          params: { city },
        });
        console.log(data);
        if (data && data.data) {
          setWeatherData([data.data]);
          setHistoricalData([...historicalData, data.data]);
          setSummary([data.data]);
          setAlerts(checkAlerts(data.data));
        } else {
          console.error('Failed to fetch weather data');
          toast.error('Failed to fetch weather data');
        }
      } catch (err) {
        console.log(err);
        console.error('Failed to fetch weather data', err);
        toast.error('Failed to fetch weather data');
      }
    }, 300000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    fetchInitialWeatherData();
  }, [city]);

  useEffect(() => {
    if (!weatherData) return;
    setAlerts(checkAlerts(weatherData[0]));
  }, [weatherData, temperatureThreshold, weatherConditionThreshold]);

  return (
    <div className="p-4 flex flex-col bg-blue-100 min-h-screen">
      <h1 className="text-3xl text-center font-bold mb-4">Weather Monitoring System</h1>
      {alerts.length > 0 && <Alert alerts={alerts} />}
      <br />
      <div>
        <UserPreferences />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {weatherData.map((data, index) => (
          <WeatherCard key={index} data={data} />
        ))}
      </div>

      {summary && summary.length > 0 && <Summary data={summary} />}
      {historicalData.length > 0 && <TrendsChart data={historicalData} />}
    </div>
  );
};

export default Home;
