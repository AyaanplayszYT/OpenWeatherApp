import { useState, useEffect } from "react";
import { Loader, AlertCircle, Sparkles } from "lucide-react";

interface PageSummarizerProps {
  weatherData: any;
  locationName: string;
  unit: "celsius" | "fahrenheit";
}

export const PageSummarizer = ({
  weatherData,
  locationName,
  unit,
}: PageSummarizerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [summary, setSummary] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const generateSummary = async () => {
    if (summary) return;
    if (!weatherData) return;

    setIsLoading(true);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_OPENROUTERKEY;

      if (!apiKey) {
        setError("API key not configured");
        setIsLoading(false);
        return;
      }

      const weatherContext = `
Current Weather at ${locationName}:
- Temperature: ${weatherData.current.temperature_2m}°${unit === "celsius" ? "C" : "F"}
- Condition: ${getWeatherCondition(weatherData.current.weather_code)}
- Feels like: ${weatherData.current.apparent_temperature}°${unit === "celsius" ? "C" : "F"}
- Humidity: ${weatherData.current.relative_humidity_2m}%
- Wind Speed: ${weatherData.current.wind_speed_10m} km/h
- Dew Point: ${weatherData.current.dew_point_2m}°${unit === "celsius" ? "C" : "F"}
- Pressure: ${weatherData.current.pressure_msl} hPa
- UV Index: ${Math.round(weatherData.daily.uv_index_max[0])}
- Sunrise: ${new Date(weatherData.daily.sunrise[0]).toLocaleTimeString()}
- Sunset: ${new Date(weatherData.daily.sunset[0]).toLocaleTimeString()}
- Today's High: ${weatherData.daily.temperature_2m_max[0]}°${unit === "celsius" ? "C" : "F"}
- Today's Low: ${weatherData.daily.temperature_2m_min[0]}°${unit === "celsius" ? "C" : "F"}
- Precipitation Probability: ${weatherData.daily.precipitation_probability_max[0]}%
- Precipitation: ${weatherData.daily.precipitation_sum[0]} mm
      `;

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "openai/gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: `You are a weather summarization assistant. Provide a concise, natural, and engaging summary of the current weather conditions. Include practical recommendations for outdoor activities or what to wear. Keep the response to 2-3 sentences maximum. Use emojis to make it engaging but not overwhelming.`,
              },
              {
                role: "user",
                content: `Please summarize this weather data:\n${weatherContext}`,
              },
            ],
            max_tokens: 150,
            temperature: 0.7,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("OpenRouter error:", errorData);
        setError("Failed to generate summary");
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      const summaryText =
        data.choices[0]?.message?.content || "Unable to generate summary";
      setSummary(summaryText);
    } catch (err) {
      console.error("Summary generation error:", err);
      setError("Error generating summary");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isExpanded && !summary && !isLoading) {
      generateSummary();
    }
  }, [isExpanded]);

  const handleToggle = () => {
    if (isExpanded) {
      setIsExpanded(false);
      setTimeout(() => setIsVisible(false), 300);
    } else {
      setIsVisible(true);
      setIsExpanded(true);
      if (!summary && !isLoading) {
        generateSummary();
      }
    }
  };

  const handleClose = () => {
    setIsExpanded(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  return (
    <>
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ease-out">
        <button
          onClick={handleToggle}
          className={`rounded-full flex items-center gap-2 px-4 py-2 backdrop-blur-md border border-white/20 transition-all duration-500 ease-out ${
            isExpanded
              ? "bg-white/30 shadow-2xl"
              : "bg-white/10 hover:bg-white/20 hover:shadow-lg"
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-sm font-medium">Summarise Page</span>
          {isExpanded && (
            <span className="text-sm font-medium animate-in fade-in duration-300">
              AI Weather Summary
            </span>
          )}
        </button>
      </div>

      {isVisible && (
        <div
          className={`fixed top-16 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ease-out origin-top pointer-events-auto ${
            isExpanded
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
          }`}
        >
          <div className="glass-card p-6 rounded-2xl w-[90vw] max-w-md shadow-2xl border border-white/20">
            <div className="space-y-3">
              {isLoading ? (
                <div className="flex items-center gap-3 py-2">
                  <Loader className="w-5 h-5 animate-spin text-blue-400" />
                  <span className="text-sm text-white/70">
                    Generating summary...
                  </span>
                </div>
              ) : error ? (
                <div className="flex items-start gap-3 py-2">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-red-200">{error}</span>
                </div>
              ) : (
                <p className="text-sm text-white/90 leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-500">
                  {summary}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {isExpanded && (
        <div
          className="fixed inset-0 z-30 bg-black/20 transition-opacity duration-300 cursor-pointer"
          onClick={handleClose}
        />
      )}
    </>
  );
};
