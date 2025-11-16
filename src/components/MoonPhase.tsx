import { Moon } from "lucide-react";

export const MoonPhase = () => {
  const getMoonPhase = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    // Calculate days since known new moon (Jan 6, 2000)
    const knownNewMoon = new Date(2000, 0, 6);
    const currentDate = new Date(year, month - 1, day);
    const daysSinceNewMoon = Math.floor(
      (currentDate.getTime() - knownNewMoon.getTime()) / (24 * 60 * 60 * 1000)
    );

    // Lunar cycle is approximately 29.53 days
    const lunarCycle = 29.53;
    const phaseDay = daysSinceNewMoon % lunarCycle;

    const phases = [
      { name: "New Moon", range: [0, 1.84], emoji: "🌑" },
      { name: "Waxing Crescent", range: [1.84, 7.38], emoji: "🌒" },
      { name: "First Quarter", range: [7.38, 9.23], emoji: "🌓" },
      { name: "Waxing Gibbous", range: [9.23, 14.77], emoji: "🌔" },
      { name: "Full Moon", range: [14.77, 16.61], emoji: "🌕" },
      { name: "Waning Gibbous", range: [16.61, 22.15], emoji: "🌖" },
      { name: "Last Quarter", range: [22.15, 23.99], emoji: "🌗" },
      { name: "Waning Crescent", range: [23.99, 29.53], emoji: "🌘" },
    ];

    const currentPhase = phases.find(
      (phase) => phaseDay >= phase.range[0] && phaseDay < phase.range[1]
    ) || phases[0];

    const illumination = Math.round(
      (Math.sin((phaseDay / lunarCycle) * Math.PI * 2 - Math.PI / 2) + 1) / 2 * 100
    );

    return { ...currentPhase, illumination, phaseDay };
  };

  const phase = getMoonPhase();

  return (
    <div className="glass-card p-6 rounded-2xl text-center">
      <h3 className="text-lg font-semibold mb-4">Moon Phase</h3>
      <div className="text-6xl mb-4">{phase.emoji}</div>
      <div className="text-xl font-bold mb-2">{phase.name}</div>
      <div className="text-sm text-gray-300">
        {phase.illumination}% Illuminated
      </div>
    </div>
  );
};
