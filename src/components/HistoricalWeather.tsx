import { Calendar, TrendingDown, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface HistoricalWeatherEntry {
  date: string;
  temp: number;
  precipitation: number;
  humidity: number;
  windSpeed: number;
}

interface HistoricalWeatherProps {
  current: HistoricalWeatherEntry;
  history: HistoricalWeatherEntry[];
  year: number;
}

export const HistoricalWeather = ({ current, history, year }: HistoricalWeatherProps) => {
  const chartData = history.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    temp: entry.temp,
    lastYear: entry.temp,
    humidity: entry.humidity,
  }));

  const avgTemp = (history.reduce((sum, e) => sum + e.temp, 0) / history.length).toFixed(1);
  const avgPrecipitation = (history.reduce((sum, e) => sum + e.precipitation, 0) / history.length).toFixed(1);
  const avgHumidity = Math.round(history.reduce((sum, e) => sum + e.humidity, 0) / history.length);

  const tempDifference = (current.temp - (history[0]?.temp || 0)).toFixed(1);
  const precipDifference = (current.precipitation - (history[0]?.precipitation || 0)).toFixed(1);

  return (
    <div className="glass-card rounded-2xl p-6 shadow-[var(--shadow-sm)]">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Historical Weather Comparison</h3>
      </div>

      {/* Year Comparison */}
      <div className="mb-6 pb-6 border-b border-white/20">
        <p className="text-xs text-white/60 mb-3">Today vs {year - 1} Year Ago</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-2xl font-bold mb-1">Today</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/60">Temp:</span>
                <span className="font-semibold">{current.temp}°C</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/60">Humidity:</span>
                <span className="font-semibold">{current.humidity}%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/60">Precipitation:</span>
                <span className="font-semibold">{current.precipitation}mm</span>
              </div>
            </div>
          </div>

          <div>
            <div className="text-2xl font-bold mb-1">{year - 1}</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/60">Temp:</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{history[0]?.temp || "N/A"}°C</span>
                  {tempDifference && (
                    <span className={`flex items-center gap-1 text-xs font-bold ${parseFloat(tempDifference) > 0 ? "text-red-400" : "text-blue-400"}`}>
                      {parseFloat(tempDifference) > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {Math.abs(parseFloat(tempDifference))}°C
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/60">Humidity:</span>
                <span className="font-semibold">{history[0]?.humidity || "N/A"}%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/60">Precipitation:</span>
                <span className="font-semibold">{history[0]?.precipitation || "N/A"}mm</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Temperature Trend Chart */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-white/70 mb-3">Temperature Trend</p>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" style={{ fontSize: "12px" }} />
            <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: "12px" }} />
            <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.2)" }} />
            <Legend wrapperStyle={{ color: "rgba(255,255,255,0.7)" }} />
            <Line type="monotone" dataKey="temp" stroke="#3b82f6" name="This Year" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="lastYear" stroke="#ef4444" name={`${year - 1}`} strokeWidth={2} dot={false} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-xs text-white/60 mb-2">Avg Temperature</div>
          <div className="text-2xl font-bold">{avgTemp}°C</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-xs text-white/60 mb-2">Avg Humidity</div>
          <div className="text-2xl font-bold">{avgHumidity}%</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-xs text-white/60 mb-2">Avg Precipitation</div>
          <div className="text-2xl font-bold">{avgPrecipitation}mm</div>
        </div>
      </div>

      {/* Climate Insights */}
      <div className="pt-4 border-t border-white/20">
        <p className="text-sm font-semibold text-white/70 mb-3">Climate Insights:</p>
        <ul className="text-sm text-white/60 space-y-2">
          {parseFloat(tempDifference) > 2 && (
            <li>🔥 It's warmer than last year. Stay hydrated!</li>
          )}
          {parseFloat(tempDifference) < -2 && (
            <li>❄️ It's colder than last year. Bundle up!</li>
          )}
          {parseFloat(precipDifference) > 10 && (
            <li>💧 More rainfall than last year. Keep an umbrella handy.</li>
          )}
          {avgHumidity > 70 && (
            <li>💨 High humidity. Air feels more humid than usual.</li>
          )}
          <li>📊 Historical data helps you plan activities better.</li>
        </ul>
      </div>
    </div>
  );
};
