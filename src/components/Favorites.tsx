import { Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface FavoriteLocation {
  name: string;
  lat: number;
  lon: number;
}

interface FavoritesProps {
  currentLocation: string;
  onSelectLocation: (lat: number, lon: number, name: string) => void;
}

export const Favorites = ({
  currentLocation,
  onSelectLocation,
}: FavoritesProps) => {
  const [favorites, setFavorites] = useState<FavoriteLocation[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("favoriteLocations");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const saveFavorites = (updated: FavoriteLocation[]) => {
    setFavorites(updated);
    localStorage.setItem("favoriteLocations", JSON.stringify(updated));
  };

  const addFavorite = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const locationName = formData.get("locationName") as string;

    // Geocode the location
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(locationName)}&count=1&language=en&format=json`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        const newFavorite: FavoriteLocation = {
          name: `${result.name}, ${result.country}`,
          lat: result.latitude,
          lon: result.longitude,
        };

        if (!favorites.some((f) => f.lat === newFavorite.lat && f.lon === newFavorite.lon)) {
          saveFavorites([...favorites, newFavorite]);
          setShowAddForm(false);
        }
      }
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  const removeFavorite = (lat: number, lon: number) => {
    saveFavorites(favorites.filter((f) => f.lat !== lat || f.lon !== lon));
  };

  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Star className="w-5 h-5" />
          Favorite Locations
        </h3>
        <Button
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-xs"
        >
          {showAddForm ? "Cancel" : "+ Add"}
        </Button>
      </div>

      {showAddForm && (
        <form onSubmit={addFavorite} className="mb-4 flex gap-2">
          <input
            type="text"
            name="locationName"
            placeholder="Enter city name..."
            className="flex-1 px-3 py-2 rounded-lg bg-transparent border border-white/25 text-white text-sm"
            required
          />
          <Button type="submit" size="sm">
            Add
          </Button>
        </form>
      )}

      <div className="flex flex-wrap gap-2">
        {favorites.map((fav) => (
          <div
            key={`${fav.lat}-${fav.lon}`}
            className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-sm"
          >
            <button
              onClick={() => {
                // Save to localStorage when selecting a favorite
                localStorage.setItem("userLocation", JSON.stringify({ lat: fav.lat, lon: fav.lon }));
                localStorage.setItem("userLocationName", fav.name);
                onSelectLocation(fav.lat, fav.lon, fav.name);
              }}
              className="hover:text-blue-400 transition"
            >
              {fav.name}
            </button>
            <button
              onClick={() => removeFavorite(fav.lat, fav.lon)}
              className="hover:text-red-400 transition ml-1"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        {favorites.length === 0 && (
          <p className="text-sm text-gray-400">No favorites yet. Add one!</p>
        )}
      </div>
    </div>
  );
};
