import { ActivityIndicator, ScrollView, Button } from "react-native";
import { UnitContext } from "../providers/UnitProvider";
import { useContext, useState } from "react";
import Input from "./form/Input";
import Select from "./form/Select";
import { API_BASE, defaultUnitState } from "../lib/helpers";
import { styles } from "../AppStyles";

export default function UnitForm({
  isLoading,
  navigation,
  unitState = defaultUnitState,
}) {
  const { units, setUnits } = useContext(UnitContext);
  const [unit, setUnit] = useState(unitState);

  const unitTypeOptions = [
    { label: "T", value: "T" },
    { label: "U", value: "U" },
  ];

  const echelonOptions = [
    { label: "ARMY", value: "ARMY" },
    { label: "DIV", value: "DIV" },
    { label: "RGT", value: "RGT" },
    { label: "CMD", value: "CMD" },
    { label: "BDE", value: "BDE" },
    { label: "BN", value: "BN" },
    { label: "CO", value: "CO" },
    { label: "PLT", value: "PLT" },
  ];

  const parentOptions = [{ label: "TOP", value: "TOP" }];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const method = unit.id ? "PATCH" : "POST";

    const response = await fetch(`${API_BASE}/units/${unit.id}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(unit),
    });

    const result = await response.json();
    if (response.ok) {
      if (unit.id) {
        alert("Unit edited successfully!");
        const index = units.findIndex((u) => u.id === unit.id);
        const updatedUnits = [...units];
        updatedUnits.splice(index, 1, unit);
        setUnits(updatedUnits);
      } else {
        alert("Unit created successfully!");
        setUnits([...units, result.unitObject]);
      }
      navigation.popToTop();
    } else {
      //console.error("Failed to create unit.", result);
      const message = result?.error?.message
        ? result.error.message
        : result.message;
      alert(message);
      console.log(result.error);
    }
  };

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView style={styles.form}>
          <Select
            field="type"
            options={unitTypeOptions}
            selectedValue={unit.type ? unit.type : unitTypeOptions[0].value}
            setValue={setUnit}
            required={true}
            style={{ zIndex: 1000, elevation: 1000, position: "relative" }}
          />
          <Select
            field="parent"
            options={[...parentOptions, ...units]}
            selectedValue={unit.parent ? unit.parent : parentOptions[0].value}
            required={true}
            setValue={setUnit}
          />
          <Select
            field="echelon"
            options={echelonOptions}
            selectedValue={unit.echelon ? unit.echelon : null}
            setValue={setUnit}
          />
          <Input
            field="name"
            value={unit.name}
            setValue={setUnit}
            required={true}
            placeholder="138th BumbleBee BDE"
          />
          <Input
            field="uic"
            value={unit.uic}
            setValue={setUnit}
            placeholder="WD8AEE"
          />
          <Input
            field="unit_class"
            value={unit.unit_class}
            setValue={setUnit}
            placeholder="OPFOR SIG PLT"
          />
          <Input
            field="template"
            value={unit.template}
            setValue={setUnit}
            placeholder="SIG BTR 80 PLT"
          />
          <Input
            field="symbol"
            value={unit.symbol}
            setValue={setUnit}
            placeholder="SNGPUUS----DXCG"
          />
          <Button onPress={handleSubmit} title="Submit"></Button>
        </ScrollView>
      )}
    </>
  );
}
