import { Dialog } from "@headlessui/react";
import { IoAlert } from "react-icons/io5";

const ErrorModal = ({
  message = "Message",
  title = "Error",
}: {
  message?: string;
  title?: string;
}): JSX.Element => (
  <>
    <div className="dialog-header bg-red-300">
      <IoAlert className="h-6 w-6 text-red-700" aria-hidden="true" />
    </div>
    <div className="dialog-content">
      <Dialog.Title>{title}</Dialog.Title>
      <p>{message}</p>
    </div>
  </>
);

export default ErrorModal;
