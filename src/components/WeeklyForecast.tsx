import { AnimatedWeatherIcon } from "./AnimatedWeatherIcon";
import { getWeatherGradient } from "@/lib/weatherGradients";

interface DayForecast {
  date: string;
  day: string;
  weatherCode: number;
  maxTemp: number;
  minTemp: number;
}

interface WeeklyForecastProps {
  forecast: DayForecast[];
  unit: "celsius" | "fahrenheit";
}

export const WeeklyForecast = ({ forecast, unit }: WeeklyForecastProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {forecast.map((day, index) => {
        const gradientClass = getWeatherGradient(day.weatherCode);
        return (
          <div
            key={index}
            className={`glass-card rounded-2xl p-6 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all text-center bg-gradient-to-br ${gradientClass}`}
          >
            <div className="text-sm font-medium text-muted-foreground mb-4">
              {day.day}
            </div>
            <AnimatedWeatherIcon weatherCode={day.weatherCode} size={48} />
            <div className="space-y-1 mt-4">
              <div className="text-lg font-semibold">
                {Math.round(day.maxTemp)}°
              </div>
              <div className="text-sm text-muted-foreground">
                {Math.round(day.minTemp)}°
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
