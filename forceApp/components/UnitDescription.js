import { View, Text } from "react-native";
import { styles } from "../AppStyles";
import Heading from "./Heading";

export default function UnitDescription({ unit }) {
  return (
    <View>
      <Heading level="4">{unit.name}</Heading>
      <View style={styles.details}>
        <Text>
          {unit.type && `Unit Type: ${unit.type}\n`}
          {unit.parent && `Unit Parent: ${unit.parent}\n`}
          {unit.uic && `Unit UIC: ${unit.uic}\n`}
          {unit.echelon && `Unit Echelon: ${unit.echelon}\n`}
          {unit.unit_class && `Unit Class: ${unit.unit_class}\n`}
          {unit.template && `Unit Template: ${unit.template}\n`}
          {unit.createdAt && `Created: ${unit.createdAt}\n`}
          {unit.updatedAt && `Updated: ${unit.updatedAt}`}
        </Text>
      </View>
    </View>
  );
}
