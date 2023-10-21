import { AuthProvider } from "./AuthProvider";
import { UnitProvider } from "./UnitProvider";

export default function Providers({ children }) {
  return (
    <UnitProvider>
      <AuthProvider>{children}</AuthProvider>
    </UnitProvider>
  );
}
