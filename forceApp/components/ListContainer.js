import { FlatList, View } from "react-native";
import { styles } from "../AppStyles";
import UnitSymbol from "./UnitSymbol";
import UnitDescription from "./UnitDescription";
import UnitButtons from "./UnitButtons";
import { useContext } from "react";
import { UnitContext } from "../providers/UnitProvider";

export default function ListContainer({ data, navigation }) {
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

  const renderItem = ({ item }) =>
    item && (
      <View style={styles.listContainer}>
        <UnitSymbol unit={item} />
        <UnitDescription unit={item} />
        <UnitButtons
          unit={item}
          navigation={navigation}
          handleDelete={handleDelete}
        />
      </View>
    );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => (item?.id ? item.id : 0)}
      style={styles.ListContainer}
    />
  );
}
