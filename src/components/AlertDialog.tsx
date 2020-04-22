import * as React from "react";
import { Dialog, Button, DialogBackdrop, DialogProps } from "reakit";

type Props = DialogProps & { onConfirm: () => void };

function AlertDialog({ onConfirm, ...props }: Props) {
  const onConfirmClick = () => {
    props.hide?.();
    onConfirm?.();
  };
  return (
    <DialogBackdrop {...props} className="components-modal__screen-overlay">
      <Dialog
        {...props}
        role="alertdialog"
        className="components-modal__frame"
        aria-describedby="alert-dialog-description"
      >
        <div className="components-modal__content">
          <p id="alert-dialog-description">{props.children}</p>
          <Button onClick={props.hide} className="components-button">
            Cancel
          </Button>
          <Button onClick={onConfirmClick} className="components-button">
            Confirm
          </Button>
        </div>
      </Dialog>
    </DialogBackdrop>
  );
}

export default AlertDialog;
