import { Text, View } from "react-native";

export default function ViewUnitScreen({ route }) {
  const { unitId } = route.params;

  if (!unitId) return <></>;
  return (
    <View>
      <Text>{unitId}</Text>
    </View>
  );
}
