import { View, Button } from "react-native";
import { styles } from "../AppStyles";
import { useContext } from "react";
import { UnitContext } from "../providers/UnitProvider";
import { API_BASE } from "../lib/helpers";

export default function UnitButtons({ unit, navigation, showView }) {
  const { deleteUnit } = useContext(UnitContext);

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
      await response.json();
      deleteUnit(unitId);
      if (navigation.canGoBack()) navigation.pop();
    } else {
      alert(response);
      console.error("Failed to delete unit.");
    }
  };

  return (
    <View style={styles.actions}>
      {showView && (
        <Button
          title="View"
          onPress={() => navigation.navigate("View Unit", { unitId: unit.id })}
        />
      )}
      <Button
        title="Edit"
        onPress={() => navigation.navigate("Edit Unit", { unitId: unit.id })}
      />
      <Button title="Delete" onPress={handleDelete} />
    </View>
  );
}
