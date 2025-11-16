import { Wind } from "lucide-react";

interface AirQualityIndexProps {
  aqi: number;
  pm25: number;
  pm10: number;
  no2: number;
  o3: number;
}

export const AirQualityIndex = ({ aqi, pm25, pm10, no2, o3 }: AirQualityIndexProps) => {
  const getAQILevel = (value: number): { label: string; color: string; bgColor: string; description: string } => {
    if (value <= 50) return { label: "Good", color: "text-green-400", bgColor: "bg-green-500/20", description: "Air quality is satisfactory" };
    if (value <= 100) return { label: "Moderate", color: "text-yellow-400", bgColor: "bg-yellow-500/20", description: "Sensitive groups may be affected" };
    if (value <= 150) return { label: "Unhealthy for Sensitive Groups", color: "text-orange-400", bgColor: "bg-orange-500/20", description: "Consider limiting outdoor activity" };
    if (value <= 200) return { label: "Unhealthy", color: "text-red-400", bgColor: "bg-red-500/20", description: "Reduce outdoor activities" };
    if (value <= 300) return { label: "Very Unhealthy", color: "text-purple-400", bgColor: "bg-purple-500/20", description: "Avoid outdoor activities" };
    return { label: "Hazardous", color: "text-red-600", bgColor: "bg-red-600/30", description: "Stay indoors" };
  };

  const aqiLevel = getAQILevel(aqi);

  return (
    <div className={`glass-card rounded-2xl p-6 shadow-[var(--shadow-sm)] ${aqiLevel.bgColor}`}>
      <div className="flex items-center gap-2 mb-6">
        <Wind className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Air Quality Index (AQI)</h3>
      </div>

      {/* Main AQI Display */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <div className="text-5xl font-bold mb-2">{aqi}</div>
            <p className={`text-lg font-semibold ${aqiLevel.color}`}>{aqiLevel.label}</p>
            <p className="text-sm text-white/60 mt-2">{aqiLevel.description}</p>
          </div>

          {/* AQI Gauge */}
          <div className="w-24 h-24 relative">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="aqiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="17%" stopColor="#eab308" />
                  <stop offset="33%" stopColor="#f97316" />
                  <stop offset="67%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#aqiGradient)"
                strokeWidth="8"
                strokeDasharray={`${(Math.min(aqi, 300) / 300) * 282.7} 282.7`}
                transform="rotate(-90 50 50)"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">{Math.round((aqi / 300) * 100)}%</div>
          </div>
        </div>
      </div>

      {/* Pollutant Details */}
      <div className="space-y-3">
        <div className="text-sm font-semibold text-white/70 mb-3">Pollutant Levels (µg/m³)</div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xs text-white/60 mb-1">PM2.5</div>
            <div className="text-2xl font-bold">{pm25.toFixed(1)}</div>
            <div className="text-xs text-white/50 mt-1">Fine Particles</div>
          </div>

          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xs text-white/60 mb-1">PM10</div>
            <div className="text-2xl font-bold">{pm10.toFixed(1)}</div>
            <div className="text-xs text-white/50 mt-1">Coarse Particles</div>
          </div>

          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xs text-white/60 mb-1">NO₂</div>
            <div className="text-2xl font-bold">{no2.toFixed(1)}</div>
            <div className="text-xs text-white/50 mt-1">Nitrogen Dioxide</div>
          </div>

          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xs text-white/60 mb-1">O₃</div>
            <div className="text-2xl font-bold">{o3.toFixed(1)}</div>
            <div className="text-xs text-white/50 mt-1">Ozone</div>
          </div>
        </div>
      </div>

      {/* Health Recommendations */}
      <div className="mt-6 pt-4 border-t border-white/20">
        <div className="text-sm">
          <p className="text-white/70 font-semibold mb-2">Health Recommendations:</p>
          <ul className="text-sm text-white/60 space-y-1">
            {aqi <= 50 && <li>✓ Air quality is good. Enjoy outdoor activities!</li>}
            {aqi > 50 && aqi <= 100 && <li>• Sensitive groups should limit intense outdoor activities</li>}
            {aqi > 100 && aqi <= 150 && <li>• Everyone should reduce prolonged outdoor exertion</li>}
            {aqi > 150 && <li>• Avoid outdoor activities. Stay indoors with air purification if possible</li>}
          </ul>
        </div>
      </div>
    </div>
  );
};
