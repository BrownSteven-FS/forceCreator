import { useContext } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { UnitContext } from "../providers/UnitProvider";
import Heading from "../components/Heading";
import ListContainer from "../components/ListContainer";

export default function ViewUnitScreen({ route, navigation }) {
  const { unitId } = route.params;

  const { units, setUnits } = useContext(UnitContext);

  const unit = units.find((u) => u.id == unitId);

  return (
    <SafeAreaView>
      <Heading level={2}>View Unit</Heading>
      <ListContainer
        data={[unit]}
        setUnits={setUnits}
        navigation={navigation}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
