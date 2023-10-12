import { SafeAreaView } from "react-native";

import { styles } from "./AppStyles";
import Heading from "./components/Heading";

//  `https://brownstevenfs-force-creator-db0f08c506e7.herokuapp.com/api_v1/units`

export default function CategoriesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Heading>Categories</Heading>
    </SafeAreaView>
  );
}
