import { Unit } from "../types/types";
import ms from "milsymbol";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { API_BASE } from "../lib/helpers";
import { Link } from "react-router-dom";

const UnitListing = ({ unit, setUnits }: { unit: Unit; setUnits: any }) => {
  const handleDelete = async () => {
    const response = await fetch(`${API_BASE}/units/${unit.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const result = await response.json();
      setUnits(result.units);
      console.log(result);
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
        <ul>
          {unit.type && <li>Unit Type: {unit.type}</li>}
          {unit.parent && <li>Unit Parent: {unit.parent}</li>}
          {unit.uic && <li>Unit UIC: {unit.uic}</li>}
          {unit.echelon && <li>Unit Echelon: {unit.echelon}</li>}
          {unit.unit_class && <li>Unit Class: {unit.unit_class}</li>}
          {unit.template && <li>Unit Template: {unit.template}</li>}
        </ul>
      </div>
      <div className="absolute top-4 right-4 flex gap-4">
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
