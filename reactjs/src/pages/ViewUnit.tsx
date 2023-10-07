import { useEffect, useState } from "react";
import { Unit } from "../types/types";
import { API_BASE } from "../lib/helpers";
import { useParams } from "react-router";
import LoadingComponent from "../components/Loading";
import UnitListing from "../components/UnitListing";
import ErrorComponent from "../components/Error";

const ViewUnitPage = () => {
  const { id } = useParams();
  const [unit, setUnit] = useState<Unit | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE}/units/${id}`);
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
    <div className="mx-auto max-w-7xl">
      {isLoading && <LoadingComponent />}
      {unit && <UnitListing unit={unit} />}
      {error && !isLoading && <ErrorComponent message={error} />}
    </div>
  );
};

export default ViewUnitPage;
