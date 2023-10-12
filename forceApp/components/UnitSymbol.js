import { View, Text } from "react-native";
import { styles } from "../AppStyles";
import SVGComponent from "./SVGComponent";
import ms from "milsymbol";

export default function UnitSymbol({ unit }) {
  return (
    <View style={styles.figure}>
      <SVGComponent xml={new ms.Symbol(unit.symbol, { size: 36 }).asSVG()} />
      <Text style={styles.caption}>SIDC: {unit.symbol}</Text>
    </View>
  );
}
