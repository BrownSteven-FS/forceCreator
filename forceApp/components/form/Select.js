import { StyleSheet, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Heading from "../Heading";
import { styles } from "../../AppStyles";

export default function Select({ field, options, selectedValue, setValue }) {
  return (
    <View style={styles.inputContainer}>
      <Heading>{field}</Heading>
      <RNPickerSelect
        value={selectedValue}
        onValueChange={(newValue) =>
          setValue((prev) => ({ ...prev, [field]: newValue }))
        }
        items={options}
        style={{
          ...pickerSelectStyles,
          iconContainer: {
            top: 20,
            right: 10,
          },
        }}
        Icon={() => {
          return (
            <View
              style={{
                backgroundColor: "transparent",
                borderTopWidth: 10,
                borderTopColor: "gray",
                borderRightWidth: 10,
                borderRightColor: "transparent",
                borderLeftWidth: 10,
                borderLeftColor: "transparent",
                width: 0,
                height: 0,
              }}
            />
          );
        }}
      />
    </View>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
  },
});
