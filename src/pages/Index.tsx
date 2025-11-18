import { useState, useEffect } from "react";
import { Search, Wind, Sunrise, Sunset, Droplets, Eye, Gauge, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CurrentWeather } from "@/components/CurrentWeather";
import { WeeklyForecast } from "@/components/WeeklyForecast";
import { HighlightCard } from "@/components/HighlightCard";
import { UVIndexGauge } from "@/components/UVIndexGauge";
import { HourlyForecast } from "@/components/HourlyForecast";
import { MoonPhase } from "@/components/MoonPhase";
import { AdditionalMetrics } from "@/components/AdditionalMetrics";
import { Favorites } from "@/components/Favorites";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { RainfallChart } from "@/components/RainfallChart";
import { WeatherAlerts } from "@/components/WeatherAlerts";
import { AirQualityIndex } from "@/components/AirQualityIndex";
import { PollenCount } from "@/components/PollenCount";
import { UVIndexHistory } from "@/components/UVIndexHistory";
import { HistoricalWeather } from "@/components/HistoricalWeather";
import { PageSummarizer } from "@/components/PageSummarizer";
import { useWeatherData } from "@/hooks/useWeatherData";

const Index = () => {
  const [unit, setUnit] = useState<"celsius" | "fahrenheit">("celsius");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState<string>("");
  const [fadeIn, setFadeIn] = useState(false);
  const { data: weatherData, isLoading, isError, error, locationName, setCoordinates, setLocationName, requestUserLocation } = useWeatherData(unit);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation when weather data loads
    if (weatherData && !isLoading) {
      setFadeIn(true);
    }
  }, [weatherData, isLoading]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || !searchQuery.trim()) return;

    setIsSearching(true);
    try {
      // Use Open-Meteo geocoding API
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery)}&count=1&language=en&format=json`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        const coords = { lat: result.latitude, lon: result.longitude };
        
        // Format location name
        const locationParts = [result.name, result.admin1, result.country].filter(Boolean);
        const locationName = locationParts.join(", ");
        
        // Save to localStorage before setting coordinates
        localStorage.setItem("userLocation", JSON.stringify(coords));
        localStorage.setItem("userLocationName", locationName);
        
        // Now update state
        setCoordinates(coords);
        setLocationName(locationName);
        setSearchQuery("");
      } else {
        alert("Location not found. Please try another search.");
      }
    } catch (error) {
      console.error("Search error:", error);
      alert("Error searching for location. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const getWeatherCondition = (code: number) => {
    if (code === 0) return "Clear sky";
    if (code <= 3) return "Partly cloudy";
    if (code <= 49) return "Foggy";
    if (code <= 59) return "Drizzle";
    if (code <= 69) return "Rain";
    if (code <= 79) return "Snow";
    if (code <= 99) return "Thunderstorm";
    return "Clear";
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatTimeOnly = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getDayName = (dateString: string, index: number) => {
    if (index === 0) return "Today";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", { weekday: "short" });
  };

  const getWindDirection = (degrees: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl text-muted-foreground mb-4">Loading weather data...</div>
          <div className="text-sm text-gray-400">This may take a few seconds</div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center glass-card p-8 rounded-2xl max-w-md">
          <div className="text-2xl text-red-500 mb-4">⚠️ Error Loading Weather</div>
          <div className="text-sm text-gray-300 mb-6">
            {error instanceof Error ? error.message : "Failed to load weather data. Please try again."}
          </div>
          <Button onClick={() => window.location.reload()}>
            Reload Page
          </Button>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-muted-foreground">No weather data available</div>
      </div>
    );
  }

  const weeklyForecast = weatherData.daily.time.slice(0, 7).map((date, index) => ({
    date,
    day: getDayName(date, index),
    weatherCode: weatherData.daily.weather_code[index],
    maxTemp: weatherData.daily.temperature_2m_max[index],
    minTemp: weatherData.daily.temperature_2m_min[index],
  }));

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className={`max-w-[1600px] mx-auto space-y-8 transition-all duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
        {/* Header */}
        <header className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search for places..."
                className="pl-12 h-12 rounded-full bg-card border-0 shadow-[var(--shadow-sm)]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                disabled={isSearching}
              />
            </div>
            
            {/* Current Time Display */}
            <div className="glass-card p-3 flex items-center gap-2 whitespace-nowrap">
              <Clock className="w-5 h-5" />
              <span className="text-lg font-semibold">{currentTime}</span>
            </div>

            {/* Show My Location Button */}
            <Button
              onClick={requestUserLocation}
              variant="ghost"
              size="sm"
              className="rounded-full flex items-center gap-2"
              title="Enable location permission to show your location"
            >
              <MapPin className="w-5 h-5" />
              <span className="hidden sm:inline">My Location</span>
            </Button>

            {/* AI Summary - Global Component */}
            {weatherData && (
              <PageSummarizer
                weatherData={weatherData}
                locationName={locationName}
                unit={unit}
              />
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex bg-glass rounded-full p-1 shadow-[var(--shadow-sm)] border border-white/25 backdrop-blur-md">
              <Button
                variant={unit === "celsius" ? "default" : "ghost"}
                size="sm"
                className="rounded-full"
                onClick={() => setUnit("celsius")}
              >
                °C
              </Button>
              <Button
                variant={unit === "fahrenheit" ? "default" : "ghost"}
                size="sm"
                className="rounded-full"
                onClick={() => setUnit("fahrenheit")}
              >
                °F
              </Button>
            </div>
            <DarkModeToggle />
          </div>
        </header>

        {/* Weekly Forecast */}
        <section>
          <WeeklyForecast forecast={weeklyForecast} unit={unit} />
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Weather */}
          <div className="lg:col-span-1">
            <CurrentWeather
              temperature={weatherData.current.temperature_2m}
              weatherCode={weatherData.current.weather_code}
              location={locationName}
              time={formatTime(weatherData.current.time)}
              condition={getWeatherCondition(weatherData.current.weather_code)}
              unit={unit}
            />
          </div>

          {/* Today's Highlights */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold">Today's Highlights</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* UV Index */}
              <HighlightCard title="UV Index">
                <UVIndexGauge value={Math.round(weatherData.daily.uv_index_max[0])} />
              </HighlightCard>

              {/* Wind Status */}
              <HighlightCard
                title="Wind Status"
                value={weatherData.current.wind_speed_10m.toFixed(2)}
                unit="km/h"
                status={getWindDirection(weatherData.current.wind_direction_10m)}
                icon={<Wind className="w-4 h-4" />}
              />

              {/* Sunrise & Sunset */}
              <HighlightCard title="Sunrise & Sunset">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sun-glow flex items-center justify-center">
                      <Sunrise className="w-5 h-5 text-sun" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold">
                        {formatTimeOnly(weatherData.daily.sunrise[0])}
                      </div>
                      <div className="text-xs text-muted-foreground">Sunrise</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <Sunset className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold">
                        {formatTimeOnly(weatherData.daily.sunset[0])}
                      </div>
                      <div className="text-xs text-muted-foreground">Sunset</div>
                    </div>
                  </div>
                </div>
              </HighlightCard>

              {/* Humidity */}
              <HighlightCard
                title="Humidity"
                value={weatherData.current.relative_humidity_2m}
                unit="%"
                status="Normal 👍"
                icon={<Droplets className="w-4 h-4" />}
              />

              {/* Visibility */}
              <HighlightCard
                title="Visibility"
                value={(weatherData.hourly.visibility[0] / 1000).toFixed(1)}
                unit="km"
                status="Average 😊"
                icon={<Eye className="w-4 h-4" />}
              />

              {/* Feels Like */}
              <HighlightCard
                title="Feels Like"
                value={Math.round(weatherData.current.apparent_temperature)}
                unit={`°${unit === "celsius" ? "C" : "F"}`}
                icon={<Gauge className="w-4 h-4" />}
              />
            </div>
          </div>
        </div>

        {/* Hourly Forecast */}
        <HourlyForecast hourly={weatherData.hourly} unit={unit} />

        {/* Rainfall Chart */}
        <RainfallChart daily={weatherData.daily} />

        {/* Additional Metrics */}
        <AdditionalMetrics 
          current={weatherData.current} 
          daily={weatherData.daily} 
          unit={unit} 
        />

        {/* Moon Phase & Favorites */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MoonPhase />
          <Favorites 
            currentLocation={locationName}
            onSelectLocation={(lat, lon, name) => {
              setCoordinates({ lat, lon });
              setLocationName(name);
            }}
          />
        </div>

        {/* Data & Analytics Section */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <h2 className="text-3xl font-bold mb-8">📊 Data & Analytics</h2>

          {/* Weather Alerts */}
          <section className="mb-8">
            <WeatherAlerts />
          </section>

          {/* Air Quality & Pollen */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <AirQualityIndex 
              aqi={45}
              pm25={12.5}
              pm10={28.3}
              no2={35.6}
              o3={42.1}
            />
            <PollenCount
              treePollenLevel={25}
              grassPollenLevel={48}
              weedPollenLevel={15}
              riskLevel="moderate"
            />
          </div>

          {/* UV Index History */}
          <section className="mb-8">
            <UVIndexHistory 
              history={[
                { date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), uvIndex: 5, exposure: "caution" },
                { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), uvIndex: 6, exposure: "caution" },
                { date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), uvIndex: 4, exposure: "caution" },
                { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), uvIndex: 7, exposure: "extreme" },
                { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), uvIndex: 3, exposure: "caution" },
                { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), uvIndex: 5, exposure: "caution" },
                { date: new Date().toISOString(), uvIndex: 6, exposure: "caution" },
              ]}
            />
          </section>

          {/* Historical Weather */}
          <section>
            <HistoricalWeather 
              current={{
                date: new Date().toISOString(),
                temp: 22,
                precipitation: 5,
                humidity: 65,
                windSpeed: 12,
              }}
              history={[
                { date: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(), temp: 18, precipitation: 3, humidity: 58, windSpeed: 15 },
                { date: new Date(Date.now() - 364 * 24 * 60 * 60 * 1000).toISOString(), temp: 19, precipitation: 2, humidity: 60, windSpeed: 14 },
                { date: new Date(Date.now() - 363 * 24 * 60 * 60 * 1000).toISOString(), temp: 17, precipitation: 4, humidity: 62, windSpeed: 16 },
                { date: new Date(Date.now() - 362 * 24 * 60 * 60 * 1000).toISOString(), temp: 20, precipitation: 1, humidity: 55, windSpeed: 13 },
                { date: new Date(Date.now() - 361 * 24 * 60 * 60 * 1000).toISOString(), temp: 21, precipitation: 0, humidity: 52, windSpeed: 12 },
                { date: new Date(Date.now() - 360 * 24 * 60 * 60 * 1000).toISOString(), temp: 19, precipitation: 3, humidity: 61, windSpeed: 14 },
                { date: new Date(Date.now() - 359 * 24 * 60 * 60 * 1000).toISOString(), temp: 18, precipitation: 5, humidity: 64, windSpeed: 15 },
              ]}
              year={new Date().getFullYear()}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Index;
