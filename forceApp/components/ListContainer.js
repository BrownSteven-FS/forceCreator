import { FlatList, View } from "react-native";
import { styles } from "../AppStyles";
import UnitSymbol from "./UnitSymbol";
import UnitDescription from "./UnitDescription";
import UnitButtons from "./UnitButtons";

export default function ListContainer({ data, navigation }) {
  const renderItem = ({ item }) => (
    <View style={styles.listContainer}>
      <UnitSymbol unit={item} />
      <UnitDescription unit={item} />
      <UnitButtons unit={item} navigation={navigation} />
    </View>
  );

  console.log(data);
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.ListContainer}
    />
  );
}
