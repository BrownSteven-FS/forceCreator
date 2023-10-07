import { Dialog } from "@headlessui/react";
import { FaCheck } from "react-icons/fa";

const SuccessModal = ({
  message = "Message",
  title = "Success",
}: {
  message?: string;
  title?: string;
}): JSX.Element => (
  <>
    <div className="dialog-header bg-green-200">
      <FaCheck className="h-6 w-6 text-green-600" aria-hidden="true" />
    </div>
    <div className="dialog-content">
      <Dialog.Title>{title}</Dialog.Title>
      <p>{message}</p>
    </div>
  </>
);

export default SuccessModal;
