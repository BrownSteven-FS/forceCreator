import { useEffect, useState } from "react";
import ms from "milsymbol";

enum UnitType {
  T = "T",
  U = "U",
}
enum UnitEchelon {
  ARMY = "ARMY",
  DIV = "DIV",
  RGT = "RGT",
  CMD = "CMD",
  BDE = "BDE",
  BN = "BN",
  CO = "CO",
  PLT = "PLT",
}
interface Unit {
  id: string;
  type: UnitType;
  name: string;
  parent: string;
  uic: string;
  echelon: UnitEchelon;
  unit_class: string;
  template: string;
  symbol: string;
}

function App() {
  const [units, setUnits] = useState<Unit[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/api_v1"
      : process.env.VITE_BASE_URL;

  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      const getUnits = async () => {
        setLoading(true);
        try {
          await fetch(`${API_BASE}/units`)
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
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
    <>
      <div>
        <h1 className="text-green-500">Units</h1>
        <ul>
          {units &&
            units.map((unit) => (
              <article>
                <figure>
                  <img
                    src={`data:image/svg+xml,${encodeURIComponent(
                      new ms.Symbol(unit.symbol, { size: 24 }).asSVG()
                    )}`}
                    alt={`${unit.name}'s Symbol`}
                  />
                  <figcaption>SIDC: {unit.symbol}</figcaption>
                </figure>
                <div>
                  <h1>{unit.name}</h1>
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
            ))}
        </ul>
      </div>
    </>
  );
}

export default App;
