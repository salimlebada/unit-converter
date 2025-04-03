import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ConversionCategory, Unit, findCategoryById, findUnitById } from "@/utils/conversions";

export type RecentConversion = {
  id: string;
  categoryId: string;
  fromUnitId: string;
  toUnitId: string;
  value: number;
  timestamp: number;
};

type FavoriteConversion = {
  id: string;
  categoryId: string;
  fromUnitId: string;
  toUnitId: string;
  label?: string;
};

type ConversionContextType = {
  recentConversions: RecentConversion[];
  favoriteConversions: FavoriteConversion[];
  addRecentConversion: (conversion: Omit<RecentConversion, "id" | "timestamp">) => void;
  addFavoriteConversion: (conversion: Omit<FavoriteConversion, "id">) => void;
  removeFavoriteConversion: (id: string) => void;
  clearRecentConversions: () => void;
};

const ConversionContext = createContext<ConversionContextType | undefined>(undefined);

export const useConversionContext = () => {
  const context = useContext(ConversionContext);
  if (!context) {
    throw new Error("useConversionContext must be used within a ConversionProvider");
  }
  return context;
};

type ConversionProviderProps = {
  children: ReactNode;
};

export const ConversionProvider = ({ children }: ConversionProviderProps) => {
  const [recentConversions, setRecentConversions] = useState<RecentConversion[]>([]);
  const [favoriteConversions, setFavoriteConversions] = useState<FavoriteConversion[]>([]);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedRecent = localStorage.getItem("recentConversions");
    if (savedRecent) {
      try {
        const parsed = JSON.parse(savedRecent);
        setRecentConversions(parsed);
      } catch (e) {
        console.error("Failed to parse recent conversions", e);
      }
    }

    const savedFavorites = localStorage.getItem("favoriteConversions");
    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites);
        setFavoriteConversions(parsed);
      } catch (e) {
        console.error("Failed to parse favorite conversions", e);
      }
    }
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem("recentConversions", JSON.stringify(recentConversions));
  }, [recentConversions]);

  useEffect(() => {
    localStorage.setItem("favoriteConversions", JSON.stringify(favoriteConversions));
  }, [favoriteConversions]);

  const addRecentConversion = (conversion: Omit<RecentConversion, "id" | "timestamp">) => {
    const newConversion = {
      ...conversion,
      id: `${Date.now()}`,
      timestamp: Date.now(),
    };

    setRecentConversions((prev) => {
      // Keep only the 10 most recent conversions
      const filtered = prev.filter(
        (c) => 
          !(c.categoryId === conversion.categoryId && 
            c.fromUnitId === conversion.fromUnitId && 
            c.toUnitId === conversion.toUnitId && 
            c.value === conversion.value)
      );
      return [newConversion, ...filtered].slice(0, 10);
    });
  };

  const addFavoriteConversion = (conversion: Omit<FavoriteConversion, "id">) => {
    const newFavorite = {
      ...conversion,
      id: `fav-${Date.now()}`,
    };

    // Check if this exact conversion already exists as a favorite
    const exists = favoriteConversions.some(
      (fav) =>
        fav.categoryId === conversion.categoryId &&
        fav.fromUnitId === conversion.fromUnitId &&
        fav.toUnitId === conversion.toUnitId
    );

    if (!exists) {
      setFavoriteConversions((prev) => [...prev, newFavorite]);
    }
  };

  const removeFavoriteConversion = (id: string) => {
    setFavoriteConversions((prev) => prev.filter((fav) => fav.id !== id));
  };

  const clearRecentConversions = () => {
    setRecentConversions([]);
  };

  return (
    <ConversionContext.Provider
      value={{
        recentConversions,
        favoriteConversions,
        addRecentConversion,
        addFavoriteConversion,
        removeFavoriteConversion,
        clearRecentConversions,
      }}
    >
      {children}
    </ConversionContext.Provider>
  );
};
