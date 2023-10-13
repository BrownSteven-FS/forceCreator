import { View, Button } from "react-native";
import { styles } from "../AppStyles";

export default function UnitButtons({
  unit,
  navigation,
  handleDelete,
  showView,
}) {
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
