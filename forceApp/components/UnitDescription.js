import { View, Text } from "react-native";
import { styles } from "../AppStyles";
import Heading from "./Heading";

export default function UnitDescription({ unit }) {
  return (
    <View>
      <Heading level="3">{unit.name}</Heading>
      <View style={styles.details}>
        {unit.type && <Text>Unit Type: {unit.type}</Text>}
        {unit.parent && <Text>Unit Parent: {unit.parent}</Text>}
        {unit.uic && <Text>Unit UIC: {unit.uic}</Text>}
        {unit.echelon && <Text>Unit Echelon: {unit.echelon}</Text>}
        {unit.unit_class && <Text>Unit Class: {unit.unit_class}</Text>}
        {unit.template && <Text>Unit Template: {unit.template}</Text>}
        {unit.createdAt && <Text>Created: {unit.createdAt}</Text>}
        {unit.updatedAt && <Text>Updated: {unit.updatedAt}</Text>}
      </View>
    </View>
  );
}
