import { useEffect, useState } from "react";
import { Unit } from "../types/types";
import UnitListing from "../components/UnitListing";
import { API_BASE } from "../lib/helpers";

const HomePage = () => {
  const [units, setUnits] = useState<Unit[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let ignore = false;

  useEffect(() => {
    if (!ignore) {
      const getUnits = async () => {
        setLoading(true);
        try {
          await fetch(`${API_BASE}/units`)
            .then((res) => res.json())
            .then((data) => {
              if (data.units) setUnits(data.units);
              if (data.error)
                setError(data.error.message || "Unexpected Error");
            });
        } catch (error: any) {
          setError(error.message || "Unexpected Error");
        } finally {
          setLoading(false);
        }
      };
      getUnits();
    }
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <main>
      <section>
        <h2>All Units</h2>
        <div className="listing-container">
          {units &&
            units.map((unit, i) => (
              <UnitListing
                unit={unit}
                setUnits={setUnits}
                key={`listing-${i}`}
              />
            ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
