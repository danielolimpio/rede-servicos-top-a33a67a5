import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LocationData {
  state: string | null;
  stateCode: string | null;
  city: string | null;
  cityCode: string | null;
  neighborhood: string | null;
}

interface LocationContextType {
  location: LocationData;
  setLocation: (location: LocationData) => void;
  clearLocation: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocationState] = useState<LocationData>(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem("servicolocal_location");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {
          state: null,
          stateCode: null,
          city: null,
          cityCode: null,
          neighborhood: null,
        };
      }
    }
    return {
      state: null,
      stateCode: null,
      city: null,
      cityCode: null,
      neighborhood: null,
    };
  });

  const setLocation = (newLocation: LocationData) => {
    setLocationState(newLocation);
    localStorage.setItem("servicolocal_location", JSON.stringify(newLocation));
  };

  const clearLocation = () => {
    const empty: LocationData = {
      state: null,
      stateCode: null,
      city: null,
      cityCode: null,
      neighborhood: null,
    };
    setLocationState(empty);
    localStorage.removeItem("servicolocal_location");
  };

  return (
    <LocationContext.Provider value={{ location, setLocation, clearLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within LocationProvider");
  }
  return context;
};
