import { Unit } from "../types/types";
import ms from "milsymbol";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { API_BASE, formatDate } from "../lib/helpers";
import { Link, useNavigate } from "react-router-dom";
import { FaExpand } from "react-icons/fa";
import { useContext } from "react";
import { ModalContext } from "../providers/ModalProvider";
import SuccessModal from "./modals/SuccessModal";

const UnitListing = ({ unit, setUnits }: { unit: Unit; setUnits?: any }) => {
  const navigate = useNavigate();
  const { showModal } = useContext(ModalContext);

  const handleDelete = async () => {
    const response = await fetch(`${API_BASE}/units/${unit.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const result = await response.json();
      if (setUnits) setUnits(result.units);
      else {
        showModal(<SuccessModal message={result.message} />);
        navigate("/");
      }
    } else {
      console.error("Failed to delete unit.");
    }
  };

  return (
    <article className="listing">
      <figure>
        <img
          src={`data:image/svg+xml,${encodeURIComponent(
            new ms.Symbol(unit.symbol, { size: 36 }).asSVG()
          )}`}
          alt={`${unit.name}'s Symbol`}
        />
        <figcaption>SIDC: {unit.symbol}</figcaption>
      </figure>
      <div>
        <h3>{unit.name}</h3>
        <ul className="text-sm">
          {unit.type && <li>Unit Type: {unit.type}</li>}
          {unit.parent && <li>Unit Parent: {unit.parent}</li>}
          {unit.uic && <li>Unit UIC: {unit.uic}</li>}
          {unit.echelon && <li>Unit Echelon: {unit.echelon}</li>}
          {unit.unit_class && <li>Unit Class: {unit.unit_class}</li>}
          {unit.template && <li>Unit Template: {unit.template}</li>}
          {unit.createdAt && <li>Created: {formatDate(unit.createdAt)}</li>}
          {unit.updatedAt && <li>Updated: {formatDate(unit.updatedAt)}</li>}
        </ul>
      </div>
      <div className="absolute top-4 right-4 flex gap-4">
        {setUnits && (
          <Link to={`/view/${unit.id} `}>
            <FaExpand />
          </Link>
        )}
        <Link to={`/edit/${unit.id}`}>
          <FaPencil />
        </Link>
        <button onClick={handleDelete}>
          <FaTrash />
        </button>
      </div>
    </article>
  );
};

export default UnitListing;
