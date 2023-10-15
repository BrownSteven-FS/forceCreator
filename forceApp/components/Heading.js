import { Text } from "react-native";
import { styles } from "../AppStyles";

export default function Heading({ children, level }) {
  const fontSizeMap = {
    1: styles.h1,
    2: styles.h2,
    3: styles.h3,
    4: styles.h4,
    5: styles.h5,
  };

  const textStyle = fontSizeMap[level] || styles.h5;

  return (
    <Text style={textStyle} accessibilityRole={`header`}>
      {children}
    </Text>
  );
}
