import { useState, useEffect, createContext } from "react";

const defaultUnitContext = {
  units: [],
  isLoading: true,
  error: null,
  setUnits: () => {},
};

export const UnitContext = createContext(defaultUnitContext);

export const UnitProvider = ({ children }) => {
  const API_BASE = "http://localhost:8000/api_v1";
  const [units, setUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      const getUnits = async () => {
        setIsLoading(true);
        try {
          await fetch(`${API_BASE}/units`)
            .then((res) => res.json())
            .then((data) => {
              if (data.units) setUnits(data.units);
              console.log(data.units);
              if (data.error)
                setError(data.error.message || "Unexpected Error");
              else setError(null);
            });
        } catch (error) {
          setError(error.message || "Unexpected Error");
        } finally {
          setIsLoading(false);
        }
      };
      getUnits();
    }
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <UnitContext.Provider value={{ units, isLoading, error, setUnits }}>
      {children}
    </UnitContext.Provider>
  );
};
