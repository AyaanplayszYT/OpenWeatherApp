import { Flower } from "lucide-react";

interface PollenCountProps {
  treePollenLevel: number;
  grassPollenLevel: number;
  weedPollenLevel: number;
  riskLevel: "low" | "moderate" | "high" | "very high";
}

export const PollenCount = ({
  treePollenLevel,
  grassPollenLevel,
  weedPollenLevel,
  riskLevel,
}: PollenCountProps) => {
  const getPollenLevel = (value: number): string => {
    if (value < 30) return "Low";
    if (value < 60) return "Moderate";
    if (value < 90) return "High";
    return "Very High";
  };

  const getPollenColor = (value: number): string => {
    if (value < 30) return "text-green-400";
    if (value < 60) return "text-yellow-400";
    if (value < 90) return "text-orange-400";
    return "text-red-400";
  };

  const getRiskColor = (): string => {
    if (riskLevel === "low") return "bg-green-500/20 border-green-500";
    if (riskLevel === "moderate") return "bg-yellow-500/20 border-yellow-500";
    if (riskLevel === "high") return "bg-orange-500/20 border-orange-500";
    return "bg-red-500/20 border-red-500";
  };

  const allergyTips = {
    low: "Low risk. Most people can enjoy outdoor activities without concern.",
    moderate: "Sensitive individuals may experience mild symptoms. Consider wearing masks outdoors.",
    high: "High risk for allergies. Wear protective masks and limit time outdoors.",
    "very high": "Very high risk. Stay indoors and use air filtration systems.",
  };

  return (
    <div className={`glass-card rounded-2xl p-6 shadow-[var(--shadow-sm)] border ${getRiskColor()}`}>
      <div className="flex items-center gap-2 mb-6">
        <Flower className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Pollen Count</h3>
      </div>

      {/* Risk Level */}
      <div className="mb-6 pb-6 border-b border-white/20">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-white/70">Overall Risk Level</span>
          <span className={`px-4 py-1 rounded-full font-bold capitalize text-sm ${
            riskLevel === "low"
              ? "bg-green-600/40 text-green-200"
              : riskLevel === "moderate"
              ? "bg-yellow-600/40 text-yellow-200"
              : riskLevel === "high"
              ? "bg-orange-600/40 text-orange-200"
              : "bg-red-600/40 text-red-200"
          }`}>
            {riskLevel}
          </span>
        </div>
        <p className="text-sm text-white/60">{allergyTips[riskLevel]}</p>
      </div>

      {/* Pollen Types */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold">Tree Pollen</label>
            <span className={`font-bold ${getPollenColor(treePollenLevel)}`}>
              {getPollenLevel(treePollenLevel)}
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-400 to-red-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(treePollenLevel / 100) * 100}%` }}
            />
          </div>
          <div className="text-xs text-white/50 mt-1">{treePollenLevel}/100</div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold">Grass Pollen</label>
            <span className={`font-bold ${getPollenColor(grassPollenLevel)}`}>
              {getPollenLevel(grassPollenLevel)}
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-400 to-red-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(grassPollenLevel / 100) * 100}%` }}
            />
          </div>
          <div className="text-xs text-white/50 mt-1">{grassPollenLevel}/100</div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold">Weed Pollen</label>
            <span className={`font-bold ${getPollenColor(weedPollenLevel)}`}>
              {getPollenLevel(weedPollenLevel)}
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-400 to-red-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(weedPollenLevel / 100) * 100}%` }}
            />
          </div>
          <div className="text-xs text-white/50 mt-1">{weedPollenLevel}/100</div>
        </div>
      </div>

      {/* Allergy Prevention Tips */}
      <div className="mt-6 pt-4 border-t border-white/20">
        <p className="text-sm font-semibold text-white/70 mb-3">Allergy Prevention Tips:</p>
        <ul className="text-sm text-white/60 space-y-1">
          <li>• Keep windows closed during high pollen season</li>
          <li>• Wear sunglasses to protect eyes</li>
          <li>• Rinse hair before bed to remove pollen</li>
          <li>• Use HEPA filters in your home</li>
          <li>• Wash clothes and bedding frequently</li>
        </ul>
      </div>
    </div>
  );
};
