import { Cloud, Droplets, Eye } from "lucide-react";

interface HourlyForecastProps {
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    visibility: number[];
    precipitation_probability: number[];
  };
  unit: "celsius" | "fahrenheit";
}

export const HourlyForecast = ({ hourly, unit }: HourlyForecastProps) => {
  const now = new Date();
  const currentHour = now.getHours();

  // Get next 12 hours
  const nextHours = Array.from({ length: 12 }).map((_, i) => {
    const hourIndex = currentHour + i;
    return {
      time: new Date(now.getTime() + i * 3600000).toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      temperature: Math.round(hourly.temperature_2m[hourIndex] || 0),
      humidity: hourly.relative_humidity_2m[hourIndex] || 0,
      visibility: ((hourly.visibility[hourIndex] || 0) / 1000).toFixed(1),
      precipitation: hourly.precipitation_probability[hourIndex] || 0,
    };
  });

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Hourly Forecast</h2>
      <div className="overflow-x-auto">
        <div className="flex gap-4 min-w-min pb-4">
          {nextHours.map((hour, idx) => (
            <div
              key={idx}
              className="glass-card p-4 rounded-lg min-w-[150px] text-center"
            >
              <div className="text-sm font-semibold mb-2">{hour.time}</div>
              <div className="text-2xl font-bold mb-2">
                {hour.temperature}°{unit === "celsius" ? "C" : "F"}
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-center gap-1">
                  <Droplets className="w-3 h-3" />
                  {hour.humidity}%
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Cloud className="w-3 h-3" />
                  {hour.precipitation}%
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Eye className="w-3 h-3" />
                  {hour.visibility}km
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
