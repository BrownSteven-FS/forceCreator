import { useState, useEffect, createContext } from "react";
import { API_BASE } from "../lib/helpers";

const defaultUnitContext = {
  units: [],
  isLoading: true,
  error: null,
  setUnits: () => {},
};

export const UnitContext = createContext(defaultUnitContext);

export const UnitProvider = ({ children }) => {
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

  const deleteUnit = (unitId) => {
    const index = units.findIndex((u) => u.id === unitId);
    const updatedUnits = [...units];
    updatedUnits.splice(index, 1);
    setUnits(updatedUnits);
    console.log(units);
  };

  const updateUnit = (unit) => {
    const index = units.findIndex((u) => u.id === unit.id);
    const updatedUnits = [...units];
    updatedUnits.splice(index, 1);
    setUnits(updatedUnits);
  };

  return (
    <UnitContext.Provider
      value={{ units, isLoading, error, setUnits, deleteUnit, updateUnit }}
    >
      {children}
    </UnitContext.Provider>
  );
};
