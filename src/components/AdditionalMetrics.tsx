import { Gauge, Droplets, Thermometer, Zap, Cloud, Wind } from "lucide-react";

interface AdditionalMetricsProps {
  current: {
    dew_point_2m: number;
    pressure_msl: number;
    apparent_temperature: number;
    wind_speed_10m: number;
    temperature_2m: number;
  };
  daily: {
    precipitation_probability_max: number[];
    precipitation_sum: number[];
  };
  unit: "celsius" | "fahrenheit";
}

export const AdditionalMetrics = ({
  current,
  daily,
  unit,
}: AdditionalMetricsProps) => {
  // Calculate wind chill (simplified formula)
  const windChill = Math.round(current.apparent_temperature);

  const metrics = [
    {
      title: "Dew Point",
      value: Math.round(current.dew_point_2m),
      unit: `°${unit === "celsius" ? "C" : "F"}`,
      description: "How humid it feels",
      icon: Droplets,
    },
    {
      title: "Pressure",
      value: (current.pressure_msl / 100).toFixed(1),
      unit: "hPa",
      description: "Barometric pressure",
      icon: Gauge,
    },
    {
      title: "Precipitation",
      value: daily.precipitation_sum[0]?.toFixed(1) || 0,
      unit: "mm",
      description: "Today's rainfall",
      icon: Cloud,
    },
    {
      title: "Precipitation Chance",
      value: daily.precipitation_probability_max[0] || 0,
      unit: "%",
      description: "Chance of rain",
      icon: Zap,
    },
    {
      title: "Feels Like Temp",
      value: windChill,
      unit: `°${unit === "celsius" ? "C" : "F"}`,
      description: "Wind chill & humidity combined",
      icon: Wind,
    },
    {
      title: "Wind Speed",
      value: current.wind_speed_10m.toFixed(1),
      unit: "km/h",
      description: "Current wind speed",
      icon: Thermometer,
    },
  ];

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Additional Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div key={idx} className="glass-card p-4 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-semibold">{metric.title}</h3>
                <Icon className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-2xl font-bold mb-1">
                {metric.value} {metric.unit}
              </div>
              <p className="text-xs text-gray-300">{metric.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
