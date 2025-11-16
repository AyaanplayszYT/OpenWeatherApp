interface UVIndexGaugeProps {
  value: number;
  max?: number;
}

export const UVIndexGauge = ({ value, max = 12 }: UVIndexGaugeProps) => {
  const percentage = (value / max) * 100;
  const rotation = (percentage / 100) * 180;
  
  const getUVLevel = (uv: number) => {
    if (uv <= 2) return "Low 😊";
    if (uv <= 5) return "Moderate 😐";
    if (uv <= 7) return "High 😰";
    if (uv <= 10) return "Very High 🥵";
    return "Extreme 😱";
  };

  return (
    <div className="relative h-32 flex flex-col items-center justify-center">
      <div className="relative w-40 h-20 overflow-hidden">
        <div className="absolute inset-0 border-8 border-muted rounded-t-full" />
        <div
          className="absolute bottom-0 left-1/2 w-1 h-20 bg-accent origin-bottom -translate-x-1/2 transition-transform duration-500"
          style={{ transform: `rotate(${rotation - 90}deg)` }}
        >
          <div className="absolute -top-2 -left-1 w-3 h-3 bg-accent rounded-full" />
        </div>
        <div className="absolute bottom-0 left-1/2 w-3 h-3 glass-card border-2 border-accent rounded-full -translate-x-1/2" />
      </div>
      <div className="text-4xl font-bold mt-2">{value}</div>
      <div className="text-sm text-muted-foreground">{getUVLevel(value)}</div>
    </div>
  );
};
