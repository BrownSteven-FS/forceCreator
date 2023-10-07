import { useEffect, useState } from "react";
import UnitForm from "../components/UnitForm";
import { Unit } from "../types/types";
import { useParams } from "react-router";
import { API_BASE } from "../lib/helpers";

const EditUnitPage = () => {
  const { id } = useParams();
  const [unit, setUnit] = useState<Unit | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchUnit = async () => {
      try {
        const response = await fetch(`${API_BASE}/units/${id}`);
        const data = await response.json();
        console.log(data);
        setUnit(data.unit);
      } catch (err) {
        setError("Failed to fetch units.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUnit();
  }, []);
  return (
    <main>
      <h2>Create Unit</h2>
      {unit && <UnitForm unitState={unit} />}
    </main>
  );
};

export default EditUnitPage;
