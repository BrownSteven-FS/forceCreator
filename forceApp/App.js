import { StatusBar } from "expo-status-bar";
import { Button, SafeAreaView } from "react-native";
import { useContext } from "react";
import ListContainer from "./components/ListContainer";
import { styles } from "./AppStyles";
import Heading from "./components/Heading";
import CategoriesScreen from "./Categories";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsScreen from "./Details";
import Providers from "./providers";
import { UnitContext } from "./providers/UnitProvider";
import ViewUnitScreen from "./screens/ViewUnitScreen";
import CreateUnitScreen from "./screens/CreateUnitScreen";

//  `https://brownstevenfs-force-creator-db0f08c506e7.herokuapp.com/api_v1/units`
export function HomeScreen({ navigation }) {
  const { units } = useContext(UnitContext);
  return (
    <SafeAreaView style={styles.container}>
      <Heading>Test</Heading>
      <Button
        title="Go to details"
        onPress={() => navigation.navigate("Details")}
      />
      <ListContainer data={units} navigation={navigation} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  return (
    <Providers>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: "Force Creator",
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate("Create")}
                  title="Create"
                  color="#007BFF"
                />
              ),
            })}
          />
          <Stack.Screen name="View" component={ViewUnitScreen} />
          <Stack.Screen name="Create" component={CreateUnitScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Categories" component={CategoriesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Providers>
  );
}
