import { useContext } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { UnitContext } from "../providers/UnitProvider";
import Heading from "../components/Heading";
import UnitForm from "../components/UnitForm";

export default function EditUnitScreen({ route, navigation }) {
  const { unitId } = route.params;
  const { units } = useContext(UnitContext);
  const unit = units.find((u) => u.id == unitId);

  return (
    <SafeAreaView>
      <Heading level={2}>Edit Unit</Heading>
      <UnitForm navigation={navigation} unitState={unit} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
