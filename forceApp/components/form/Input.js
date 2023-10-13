import { StyleSheet, TextInput, View } from "react-native";
import Heading from "../Heading";

export default function Input({ field, value, setValue, placeholder = "" }) {
  const label = field.replace("_", " ");
  return (
    <View style={styles.container}>
      <Heading>{label}</Heading>
      <TextInput
        value={value}
        onChangeText={(text) =>
          setValue((prev) => ({ ...prev, [field]: text }))
        }
        style={styles.input}
        placeholder={placeholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
  },
});
