import React from "react";
import { CToast, CToastBody, CToastClose } from "@coreui/react";
import "../css/ToastMessage.css";

const ToastMessage = ({ toastMessage, closeToast, displayToast }) => {
  console.log("toastMessage", toastMessage);
  console.log("displayToast", displayToast);

  return (
    <CToast
      visible={displayToast}
      className="toast-bottom-center align-items-center"
      color={toastMessage.color}
    >
      <div className="d-flex">
        <CToastBody>{toastMessage.message}</CToastBody>
        <CToastClose className="me-2 m-auto" onClick={closeToast} />
      </div>
    </CToast>
  );
};

export default ToastMessage;
