import { useContext, useEffect, useState } from "react";
import UnitForm from "../components/UnitForm";
import { Unit } from "../types/types";
import { useParams } from "react-router";
import { API_BASE } from "../lib/helpers";
import LoadingComponent from "../components/Loading";
import { ModalContext } from "../providers/ModalProvider";
import ErrorModal from "../components/modals/ErrorModal";
import ErrorComponent from "../components/Error";

const EditUnitPage = () => {
  const { id } = useParams();
  const [unit, setUnit] = useState<Unit | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const { showModal } = useContext(ModalContext);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE}/units/${id}`);
        const data = await response.json();
        console.log(data);
        setUnit(data.unit);
        setError(null);
      } catch (error) {
        const message = "Failed to fetch units.";
        console.error(error);
        setError(message);
        showModal(<ErrorModal message={message} />);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUnits();
  }, []);

  return (
    <main>
      <h2>Edit Unit</h2>
      {unit && !error && <UnitForm unitState={unit} />}
      {isLoading && <LoadingComponent />}
      {error && <ErrorComponent message={error} />}
    </main>
  );
};

export default EditUnitPage;
