import { MapPin } from "lucide-react";
import { AnimatedWeatherIcon } from "./AnimatedWeatherIcon";
import { getWeatherGradient } from "@/lib/weatherGradients";

interface CurrentWeatherProps {
  temperature: number;
  weatherCode: number;
  location: string;
  time: string;
  condition: string;
  unit: "celsius" | "fahrenheit";
}

export const CurrentWeather = ({
  temperature,
  weatherCode,
  location,
  time,
  condition,
  unit,
}: CurrentWeatherProps) => {
  const gradientClass = getWeatherGradient(weatherCode);
  return (
    <div className={`glass-card rounded-[2rem] p-8 shadow-[var(--shadow-md)] h-full flex flex-col justify-between bg-gradient-to-br ${gradientClass} transition-all duration-300`}>
      <div className="flex-1 flex items-center justify-center">
        <div className="relative">
          <div className="absolute -left-8 -top-8 w-32 h-32 bg-sun-glow rounded-full blur-3xl opacity-50" />
          <AnimatedWeatherIcon weatherCode={weatherCode} size={160} />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="text-7xl font-bold">
          {Math.round(temperature)}°{unit === "celsius" ? "C" : "F"}
        </div>
        
        <div className="space-y-2">
          <div className="text-xl text-muted-foreground">{time}</div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </div>
        
        <div className="text-foreground text-lg">{condition}</div>
      </div>
    </div>
  );
};
