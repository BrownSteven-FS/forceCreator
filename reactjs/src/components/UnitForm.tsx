import React, { useEffect, useState } from "react";
import { Unit, UnitEchelon, UnitType, defaultUnitState } from "../types/types";
import { API_BASE } from "../lib/helpers";

const UnitForm = ({ unitState = defaultUnitState }) => {
  const [unit, setUnit] = useState<Partial<Unit>>(unitState);
  const [unitsList, setUnitsList] = useState<Unit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await fetch(`${API_BASE}/units`);
        const data = await response.json();
        setUnitsList(data.units);
      } catch (err) {
        setError("Failed to fetch units.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUnits();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch(`${API_BASE}/units/${unit.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(unit),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
    } else {
      console.error("Failed to create unit.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-span-3">
          <label htmlFor="type">
            Type<span>*</span>
          </label>
          <select
            id="type"
            name="type"
            value={unit.type}
            onChange={(e) =>
              setUnit((prev) => ({ ...prev, type: e.target.value as UnitType }))
            }
          >
            <option value="T">T</option>
            <option value="U">U</option>
          </select>
        </div>
        <div className="col-span-3">
          <label htmlFor="parent">
            Parent<span>*</span>
          </label>
          <select
            id="parent"
            name="parent"
            value={unit.parent}
            onChange={(e) =>
              setUnit((prev) => ({ ...prev, parent: e.target.value }))
            }
          >
            <option value="TOP">TOP</option>
            {unitsList.map((unitItem) => (
              <option key={unitItem.id} value={unitItem.id}>
                {unitItem.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-3">
          <label htmlFor="echelon">Echelon</label>
          <select
            id="echelon"
            name="echelon"
            value={unit.echelon}
            onChange={(e) =>
              setUnit((prev) => ({
                ...prev,
                echelon: e.target.value as UnitEchelon,
              }))
            }
          >
            <option value="ARMY">ARMY</option>
            <option value="DIV">DIV</option>
            <option value="RGT">RGT</option>
            <option value="CMD">CMD</option>
            <option value="BDE">BDE</option>
            <option value="BN">BN</option>
            <option value="CO">CO</option>
            <option value="PLT">PLT</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-span-3">
          <label htmlFor="name">
            Name<span>*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={unit.name}
            required
            onChange={(e) =>
              setUnit((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>

        <div className="col-span-3">
          <label htmlFor="uic">UIC</label>
          <input
            type="text"
            id="uic"
            name="uic"
            value={unit.uic}
            onChange={(e) =>
              setUnit((prev) => ({ ...prev, uic: e.target.value }))
            }
          />
        </div>
      </div>
      <div className="row">
        <div className="col-span-3">
          <label htmlFor="unit_class">Unit Class</label>
          <input
            type="text"
            id="unit_class"
            name="unit_class"
            value={unit.unit_class}
            onChange={(e) =>
              setUnit((prev) => ({ ...prev, unit_class: e.target.value }))
            }
          />
        </div>
        <div className="col-span-3">
          <label htmlFor="template">Template</label>
          <input
            type="text"
            id="template"
            name="template"
            value={unit.template}
            onChange={(e) =>
              setUnit((prev) => ({ ...prev, template: e.target.value }))
            }
          />
        </div>
      </div>
      <div className="row">
        <div className="col-span-3">
          <label htmlFor="symbol">Symbol</label>
          <input
            type="text"
            id="symbol"
            name="symbol"
            value={unit.symbol}
            onChange={(e) =>
              setUnit((prev) => ({ ...prev, symbol: e.target.value }))
            }
          />
        </div>
      </div>
      <p className="text-red-600 italic text-sm py-2">
        * denotes a required field
      </p>
      <button type="submit">Create Unit</button>
    </form>
  );
};

export default UnitForm;
