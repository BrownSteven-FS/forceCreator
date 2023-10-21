import { useContext, useEffect, useState } from "react";
import { Unit } from "../types/types";
import { API_BASE } from "../lib/helpers";
import { useParams } from "react-router";
import LoadingComponent from "../components/Loading";
import UnitListing from "../components/UnitListing";
import ErrorComponent from "../components/Error";
import { AuthContext } from "../providers/AuthProvider";

const ViewUnitPage = () => {
  const { id } = useParams();
  const [unit, setUnit] = useState<Unit | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { authHeader } = useContext(AuthContext);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        setIsLoading(true);
        const headers = await authHeader();
        const response = await fetch(`${API_BASE}/units/${id}`, { headers });
        const data = await response.json();
        if (response.ok) {
          setUnit(data.unit);
          setError(null);
        } else throw new Error(data.error);
      } catch (error) {
        const message = "Failed to fetch unit.";
        console.error(error);
        setError(message);
        setUnit(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUnits();
  }, []);

  return (
    <div className="max-w-5xl mx-auto xl:max-w-7xl">
      {isLoading && <LoadingComponent />}
      {unit && <UnitListing unit={unit} />}
      {error && !isLoading && <ErrorComponent message={error} />}
    </div>
  );
};

export default ViewUnitPage;
