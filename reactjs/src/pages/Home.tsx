import { useContext, useEffect, useState } from "react";
import { Unit } from "../types/types";
import UnitListing from "../components/UnitListing";
import { API_BASE } from "../lib/helpers";
import LoadingComponent from "../components/Loading";
import ErrorComponent from "../components/Error";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const HomePage = () => {
  const [units, setUnits] = useState<Unit[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { authHeader } = useContext(AuthContext);
  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      const getUnits = async () => {
        setIsLoading(true);
        try {
          const headers = await authHeader();
          await fetch(`${API_BASE}/units`, { headers })
            .then((res) => res.json())
            .then((data) => {
              if (data.units) setUnits(data.units);
              if (data.error)
                setError(data.error.message || "Unexpected Error");
              else setError(null);
            });
        } catch (error: any) {
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
    <main>
      <h2>All Units</h2>
      <div className="listing-container">
        {units &&
          !error &&
          units.map((unit, i) => (
            <UnitListing unit={unit} setUnits={setUnits} key={`listing-${i}`} />
          ))}
        {units?.length === 0 && !error && (
          <p>
            No units have been created. That's no fun! Try creating one{" "}
            <Link className="link" to="/create">
              here
            </Link>
            .
          </p>
        )}
      </div>
      {isLoading && <LoadingComponent />}
      {error && <ErrorComponent message={error} />}
    </main>
  );
};

export default HomePage;
