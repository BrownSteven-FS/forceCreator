import { View, Button } from "react-native";
import { styles } from "../AppStyles";
import { useContext } from "react";
import { UnitContext } from "../providers/UnitProvider";

export default function UnitButtons({ unit, navigation }) {
  const API_BASE = "http://localhost:8000/api_v1";
  const { setUnits } = useContext(UnitContext);
  console.log("test", unit);

  const handleDelete = async () => {
    const unitId = unit.id;
    const response = await fetch(`${API_BASE}/units/${unitId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      alert("Unit successfully deleted.");
      const result = await response.json();
      if (setUnits) setUnits(result.units);
    } else {
      alert(response);
      console.error("Failed to delete unit.");
    }
  };

  return (
    <View style={styles.actions}>
      {setUnits && (
        <Button
          title="View"
          onPress={() => navigation.navigate("View", { unitId: unit.id })}
        />
      )}
      <Button
        title="Edit"
        onPress={() => navigation.navigate("EditScreen", { unitId: unit.id })}
      />
      <Button title="Delete" onPress={handleDelete} />
    </View>
  );
}