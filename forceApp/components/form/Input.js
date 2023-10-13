import { TextInput, View } from "react-native";
import Heading from "../Heading";
import { styles } from "../../AppStyles";

export default function Input({ field, value, setValue, placeholder = "" }) {
  const label = field.replace("_", " ");
  return (
    <View style={styles.inputContainer}>
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
