export const getWeatherGradient = (weatherCode: number): string => {
  if (weatherCode === 0) {
    return "from-yellow-400/20 to-blue-400/20"; // Sunny
  }
  if (weatherCode <= 3) {
    return "from-blue-300/20 to-blue-200/20"; // Partly cloudy
  }
  if (weatherCode <= 49) {
    return "from-gray-400/20 to-gray-300/20"; // Foggy
  }
  if (weatherCode <= 59) {
    return "from-blue-500/20 to-blue-400/20"; // Drizzle
  }
  if (weatherCode <= 69) {
    return "from-blue-600/20 to-blue-500/20"; // Rain
  }
  if (weatherCode <= 79) {
    return "from-blue-300/20 to-white/20"; // Snow
  }
  return "from-purple-500/20 to-purple-400/20"; // Thunderstorm
};

export const getWeatherBackgroundColor = (weatherCode: number): string => {
  if (weatherCode === 0) {
    return "bg-yellow-50/5"; // Sunny
  }
  if (weatherCode <= 3) {
    return "bg-blue-50/5"; // Partly cloudy
  }
  if (weatherCode <= 49) {
    return "bg-gray-50/5"; // Foggy
  }
  if (weatherCode <= 59) {
    return "bg-blue-100/5"; // Drizzle
  }
  if (weatherCode <= 69) {
    return "bg-blue-200/5"; // Rain
  }
  if (weatherCode <= 79) {
    return "bg-blue-50/5"; // Snow
  }
  return "bg-purple-100/5"; // Thunderstorm
};
