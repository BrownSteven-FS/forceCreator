import { Platform } from "react-native";
import { SvgXml } from "react-native-svg";

export default function SVGComponent({ xml }) {
  if (Platform.OS === "web") {
    return <img src={`data:image/svg+xml,${encodeURIComponent(xml)}`} />;
  } else {
    return <SvgXml xml={xml} />;
  }
}
