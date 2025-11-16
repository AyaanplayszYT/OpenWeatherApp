import { AlertTriangle, X } from "lucide-react";
import { useState, useEffect } from "react";

interface Alert {
  id: string;
  event: string;
  headline: string;
  description: string;
  severity: "extreme" | "severe" | "moderate" | "minor";
  onset: string;
  expires: string;
}

export const WeatherAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("dismissedAlerts");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    // Simulate fetching weather alerts (in production, use real API)
    const mockAlerts: Alert[] = [
      {
        id: "1",
        event: "Thunderstorm Warning",
        headline: "Severe Thunderstorm Warning",
        description: "Heavy rain and lightning expected in your area",
        severity: "severe",
        onset: new Date().toISOString(),
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      },
    ];
    setAlerts(mockAlerts);
  }, []);

  useEffect(() => {
    localStorage.setItem("dismissedAlerts", JSON.stringify(Array.from(dismissedAlerts)));
  }, [dismissedAlerts]);

  const handleDismiss = (id: string) => {
    setDismissedAlerts((prev) => new Set([...prev, id]));
  };

  const visibleAlerts = alerts.filter((a) => !dismissedAlerts.has(a.id));

  if (visibleAlerts.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-6 shadow-[var(--shadow-sm)]">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-semibold">Weather Alerts</h3>
        </div>
        <p className="text-green-300">✓ No severe weather alerts</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-red-400" />
        Active Weather Alerts
      </h3>
      {visibleAlerts.map((alert) => (
        <div
          key={alert.id}
          className={`glass-card rounded-2xl p-6 shadow-[var(--shadow-md)] border-l-4 relative ${
            alert.severity === "extreme"
              ? "border-red-600 bg-gradient-to-r from-red-500/10 to-transparent"
              : alert.severity === "severe"
              ? "border-orange-500 bg-gradient-to-r from-orange-500/10 to-transparent"
              : alert.severity === "moderate"
              ? "border-yellow-500 bg-gradient-to-r from-yellow-500/10 to-transparent"
              : "border-blue-500 bg-gradient-to-r from-blue-500/10 to-transparent"
          }`}
        >
          <button
            onClick={() => handleDismiss(alert.id)}
            className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded transition-all"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="mb-3">
            <h4 className="text-lg font-bold mb-1">{alert.event}</h4>
            <p className="text-sm text-white/70">{alert.headline}</p>
          </div>

          <p className="text-sm mb-4">{alert.description}</p>

          <div className="flex justify-between text-xs text-white/50">
            <span>
              Onset: {new Date(alert.onset).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
            </span>
            <span>
              Expires: {new Date(alert.expires).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>

          <div className="mt-4 text-xs font-semibold">
            <span
              className={`px-3 py-1 rounded-full ${
                alert.severity === "extreme"
                  ? "bg-red-600/40 text-red-200"
                  : alert.severity === "severe"
                  ? "bg-orange-600/40 text-orange-200"
                  : alert.severity === "moderate"
                  ? "bg-yellow-600/40 text-yellow-200"
                  : "bg-blue-600/40 text-blue-200"
              }`}
            >
              {alert.severity.toUpperCase()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
