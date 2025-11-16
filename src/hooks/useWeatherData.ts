import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

interface WeatherData {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    dew_point_2m: number;
    pressure_msl: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
    uv_index_max: number[];
    precipitation_sum: number[];
    precipitation_probability_max: number[];
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    visibility: number[];
    precipitation_probability: number[];
    dew_point_2m: number[];
  };
}

const fetchWeatherData = async (
  latitude: number,
  longitude: number,
  unit: "celsius" | "fahrenheit"
): Promise<WeatherData> => {
  const tempUnit = unit === "celsius" ? "celsius" : "fahrenheit";
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,dew_point_2m,pressure_msl&hourly=temperature_2m,relative_humidity_2m,visibility,precipitation_probability,dew_point_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max&temperature_unit=${tempUnit}&wind_speed_unit=kmh&timezone=auto`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.current || !data.daily || !data.hourly) {
      throw new Error("Invalid weather data structure");
    }

    return data;
  } catch (error) {
    console.error("Weather fetch error:", error);
    throw error;
  }
};

const fetchLocationName = async (latitude: number, longitude: number): Promise<string> => {
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    const data = await response.json();
    return data.city || data.locality || data.principalSubdivision || "Unknown Location";
  } catch (error) {
    return "Unknown Location";
  }
};

export const useWeatherData = (unit: "celsius" | "fahrenheit" = "celsius") => {
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);
  const [locationName, setLocationName] = useState<string>("Select a location");

  useEffect(() => {
    // Check if user has already saved location preference
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      const parsed = JSON.parse(savedLocation);
      setCoordinates(parsed);
      setLocationName(localStorage.getItem("userLocationName") || "Your Location");
    } else {
      // Set default to New York without requiring geolocation
      setCoordinates({ lat: 40.7128, lon: -74.0060 });
      setLocationName("New York, NY");
    }
  }, []);

  const weatherQuery = useQuery({
    queryKey: ["weather", coordinates?.lat, coordinates?.lon, unit],
    queryFn: () => fetchWeatherData(coordinates!.lat, coordinates!.lon, unit),
    enabled: !!coordinates,
    refetchInterval: 300000, // Refetch every 5 minutes
  });

  const requestUserLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const coords = { lat: latitude, lon: longitude };
          setCoordinates(coords);
          localStorage.setItem("userLocation", JSON.stringify(coords));
          
          const name = await fetchLocationName(latitude, longitude);
          setLocationName(name);
          localStorage.setItem("userLocationName", name);
        },
        (error) => {
          alert("Unable to get your location. Please use the search bar instead.");
          console.error("Geolocation error:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return {
    ...weatherQuery,
    locationName,
    setCoordinates,
    setLocationName,
    requestUserLocation,
  };
};
