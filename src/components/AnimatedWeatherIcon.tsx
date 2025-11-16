import { Cloud, Sun, CloudRain, Wind, Droplets, Eye } from "lucide-react";

interface AnimatedWeatherIconProps {
  weatherCode: number;
  size?: number;
}

export const AnimatedWeatherIcon = ({ weatherCode, size = 64 }: AnimatedWeatherIconProps) => {
  const getWeatherIcon = () => {
    if (weatherCode === 0) {
      return (
        <div className="relative inline-block">
          <Sun size={size} className="text-yellow-300 animate-spin" style={{ animationDuration: "20s" }} />
        </div>
      );
    }
    if (weatherCode <= 3) {
      return (
        <div className="relative inline-block">
          <Cloud size={size} className="text-gray-300 animate-pulse" />
          <Sun size={size / 2} className="text-yellow-200 absolute bottom-2 right-2 animate-bounce" />
        </div>
      );
    }
    if (weatherCode <= 49) {
      return (
        <div className="relative inline-block animate-pulse">
          <Cloud size={size} className="text-gray-400" />
        </div>
      );
    }
    if (weatherCode <= 59) {
      return (
        <div className="relative inline-block">
          <CloudRain size={size} className="text-blue-300 animate-bounce" style={{ animationDuration: "1.5s" }} />
        </div>
      );
    }
    if (weatherCode <= 69) {
      return (
        <div className="relative inline-block">
          <CloudRain size={size} className="text-blue-400 animate-pulse" />
          <Droplets size={size / 3} className="text-blue-500 absolute top-1 right-1 animate-bounce" />
        </div>
      );
    }
    if (weatherCode <= 79) {
      return (
        <div className="relative inline-block animate-bounce">
          <Cloud size={size} className="text-blue-200" />
          <span className="text-2xl absolute inset-0 flex items-center justify-center">❄️</span>
        </div>
      );
    }
    return (
      <div className="relative inline-block animate-pulse">
        <Cloud size={size} className="text-gray-500" />
        <span className="text-2xl absolute inset-0 flex items-center justify-center">⚡</span>
      </div>
    );
  };

  return <div className="flex items-center justify-center">{getWeatherIcon()}</div>;
};
