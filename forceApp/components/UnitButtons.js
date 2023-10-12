import { View, Button } from "react-native";
import { styles } from "../AppStyles";
import { useContext } from "react";
import { UnitContext } from "../providers/UnitProvider";

export default function UnitButtons({ unit, navigation }) {
  const API_BASE = "http://localhost:3000/api_v1";
  const { setUnits } = useContext(UnitContext);

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
    } else {
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
