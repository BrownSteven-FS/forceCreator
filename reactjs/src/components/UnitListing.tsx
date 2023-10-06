import { Unit } from "../types/types";
import ms from "milsymbol";

const UnitListing = ({ unit }: { unit: Unit }) => {
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
    </article>
  );
};

export default UnitListing;
