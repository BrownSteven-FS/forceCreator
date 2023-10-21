import { useContext, useEffect, useState } from "react";
import UnitForm from "../components/UnitForm";
import { Unit } from "../types/types";
import { useParams } from "react-router";
import { API_BASE } from "../lib/helpers";
import LoadingComponent from "../components/Loading";
import { ModalContext } from "../providers/ModalProvider";
import ErrorModal from "../components/modals/ErrorModal";
import ErrorComponent from "../components/Error";
import { AuthContext } from "../providers/AuthProvider";

const EditUnitPage = () => {
  const { id } = useParams();
  const [unit, setUnit] = useState<Unit | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const { showModal } = useContext(ModalContext);
  const { authHeader } = useContext(AuthContext);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        setIsLoading(true);
        const headers = await authHeader();
        const response = await fetch(`${API_BASE}/units/${id}`, { headers });
        const data = await response.json();
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
