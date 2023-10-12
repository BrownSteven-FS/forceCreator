import { Text, View } from "react-native";

export default function EditUnitScreen({ route }) {
  const { unitId } = route.params;
  return (
    <View>
      <Text>{unitId}</Text>
    </View>
  );
}
