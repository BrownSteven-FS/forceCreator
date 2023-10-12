import { StatusBar } from "expo-status-bar";
import { Button, SafeAreaView } from "react-native";
import { useContext } from "react";
import ListContainer from "./components/ListContainer";
import { styles } from "./AppStyles";
import Heading from "./components/Heading";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Providers from "./providers";
import { UnitContext } from "./providers/UnitProvider";
import ViewUnitScreen from "./screens/ViewUnitScreen";
import CreateUnitScreen from "./screens/CreateUnitScreen";

//  `https://brownstevenfs-force-creator-db0f08c506e7.herokuapp.com/api_v1/units`

export function HomeScreen({ navigation }) {
  const { units, setUnits } = useContext(UnitContext);
  return (
    <SafeAreaView style={styles.container}>
      <Heading level="2">All Units</Heading>
      <ListContainer data={units} setUnits={setUnits} navigation={navigation} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  const createHeaderBtn = ({ navigation }) => ({
    title: "Force Creator",
    headerRight: () => (
      <Button
        onPress={() => navigation.navigate("Create Unit")}
        title="Create Unit"
        color="#007BFF"
      />
    ),
  });
  return (
    <Providers>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={createHeaderBtn}
          />
          <Stack.Screen
            name="View"
            component={ViewUnitScreen}
            options={createHeaderBtn}
          />
          <Stack.Screen name="Create Unit" component={CreateUnitScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Providers>
  );
}
