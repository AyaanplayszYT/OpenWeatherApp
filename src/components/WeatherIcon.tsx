import { Cloud, CloudRain, CloudSnow, Sun, CloudDrizzle, Wind } from "lucide-react";

interface WeatherIconProps {
  code: number;
  className?: string;
  isDay?: boolean;
}

export const WeatherIcon = ({ code, className = "", isDay = true }: WeatherIconProps) => {
  // WMO Weather interpretation codes (WW)
  if (code === 0) return <Sun className={className} />;
  if (code <= 3) return <Cloud className={className} />;
  if (code <= 49) return <Wind className={className} />;
  if (code <= 59) return <CloudDrizzle className={className} />;
  if (code <= 69) return <CloudRain className={className} />;
  if (code <= 79) return <CloudSnow className={className} />;
  if (code <= 99) return <CloudRain className={className} />;
  
  return <Sun className={className} />;
};
