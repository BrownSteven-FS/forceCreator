import { AuthProvider } from "./AuthProvider";
import { ModalProvider } from "./ModalProvider";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ModalProvider>
      <AuthProvider>{children}</AuthProvider>
    </ModalProvider>
  );
}
