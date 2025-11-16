import { Cloud } from "lucide-react";

interface RainfallChartProps {
  daily: {
    time: string[];
    precipitation_sum: number[];
    precipitation_probability_max: number[];
  };
}

export const RainfallChart = ({ daily }: RainfallChartProps) => {
  const next7Days = Array.from({ length: 7 }).map((_, i) => ({
    day: new Date(daily.time[i]).toLocaleString("en-US", { weekday: "short" }),
    precipitation: daily.precipitation_sum[i] || 0,
    probability: daily.precipitation_probability_max[i] || 0,
  }));

  const maxPrecipitation = Math.max(...next7Days.map((d) => d.precipitation), 1);

  return (
    <div className="glass-card p-6 rounded-2xl">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Cloud className="w-5 h-5" />
        7-Day Rainfall Forecast
      </h3>
      <div className="space-y-4">
        {next7Days.map((day, idx) => (
          <div key={idx}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold">{day.day}</span>
              <span className="text-xs text-gray-300">
                {day.precipitation.toFixed(1)}mm ({day.probability}% chance)
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{
                  width: `${(day.precipitation / maxPrecipitation) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
