import { SafeAreaView, StatusBar } from "react-native";
import UnitForm from "../components/UnitForm";
import Heading from "../components/Heading";

export default function CreateUnitScreen({ navigation }) {
  return (
    <SafeAreaView>
      <Heading level={2}>Create New Unit</Heading>
      <UnitForm navigation={navigation} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
