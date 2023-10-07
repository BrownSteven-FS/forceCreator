import { ModalProvider } from "./ModalProvider";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <ModalProvider>{children}</ModalProvider>;
}
