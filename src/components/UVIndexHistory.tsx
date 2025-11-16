import { TrendingUp, BarChart3 } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface UVHistoryEntry {
  date: string;
  uvIndex: number;
  exposure: "safe" | "caution" | "extreme";
}

interface UVIndexHistoryProps {
  history: UVHistoryEntry[];
}

export const UVIndexHistory = ({ history }: UVIndexHistoryProps) => {
  const chartData = history.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    uv: entry.uvIndex,
    exposure: entry.exposure,
  }));

  const getExposureColor = (level: number): string => {
    if (level <= 2) return "#22c55e";
    if (level <= 5) return "#eab308";
    if (level <= 7) return "#f97316";
    if (level <= 10) return "#ef4444";
    return "#8b5cf6";
  };

  const avgUV = (history.reduce((sum, e) => sum + e.uvIndex, 0) / history.length).toFixed(1);
  const maxUV = Math.max(...history.map((e) => e.uvIndex));
  const dangerDays = history.filter((e) => e.uvIndex > 7).length;

  return (
    <div className="glass-card rounded-2xl p-6 shadow-[var(--shadow-sm)]">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5" />
        <h3 className="text-lg font-semibold">UV Index History (7 Days)</h3>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-xs text-white/60 mb-1">Average UV Index</div>
          <div className="text-2xl font-bold">{avgUV}</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-xs text-white/60 mb-1">Peak UV Index</div>
          <div className="text-2xl font-bold">{maxUV}</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-xs text-white/60 mb-1">High UV Days</div>
          <div className="text-2xl font-bold">{dangerDays}</div>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-6">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" style={{ fontSize: "12px" }} />
            <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.2)" }}
              cursor={{ fill: "rgba(255,255,255,0.1)" }}
            />
            <Bar dataKey="uv" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Risk Breakdown */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-white/70">Exposure Risk Breakdown</p>
        <div className="space-y-2">
          {history.map((entry, idx) => {
            const riskLabel =
              entry.uvIndex <= 2
                ? "Safe"
                : entry.uvIndex <= 5
                ? "Moderate"
                : entry.uvIndex <= 7
                ? "High"
                : entry.uvIndex <= 10
                ? "Very High"
                : "Extreme";

            return (
              <div key={idx} className="flex items-center justify-between text-sm">
                <span className="text-white/70">
                  {new Date(entry.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-white/10 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(entry.uvIndex / 11) * 100}%`,
                        backgroundColor: getExposureColor(entry.uvIndex),
                      }}
                    />
                  </div>
                  <span className="text-sm font-semibold w-16 text-right">UV {entry.uvIndex}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Protection Recommendations */}
      <div className="mt-6 pt-4 border-t border-white/20">
        <p className="text-sm font-semibold text-white/70 mb-3">UV Protection Guide:</p>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex gap-2">
            <span className="px-2 py-1 rounded-full bg-green-600/40">0-2</span>
            <span className="text-white/60">Safe - No protection needed</span>
          </div>
          <div className="flex gap-2">
            <span className="px-2 py-1 rounded-full bg-yellow-600/40">3-5</span>
            <span className="text-white/60">Use SPF 30+ sunscreen</span>
          </div>
          <div className="flex gap-2">
            <span className="px-2 py-1 rounded-full bg-orange-600/40">6-7</span>
            <span className="text-white/60">Use SPF 50+, limit sun</span>
          </div>
          <div className="flex gap-2">
            <span className="px-2 py-1 rounded-full bg-red-600/40">8-10</span>
            <span className="text-white/60">Avoid sun, protective gear</span>
          </div>
          <div className="col-span-2 flex gap-2">
            <span className="px-2 py-1 rounded-full bg-purple-600/40">11+</span>
            <span className="text-white/60">Stay indoors, extreme danger</span>
          </div>
        </div>
      </div>
    </div>
  );
};
