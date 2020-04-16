import * as React from "react";
import {
  useDialogState,
  Dialog,
  DialogDisclosure,
  DialogBackdrop,
} from "reakit";
import PrimaryTabs from "./PrimaryTabs";

type Props = React.ButtonHTMLAttributes<{}>;

const PrimaryModal = React.forwardRef<HTMLButtonElement, Props>(
  (props, ref) => {
    const dialog = useDialogState();
    return (
      <>
        <DialogDisclosure {...dialog} {...props} ref={ref}>
          Modal...
        </DialogDisclosure>
        <DialogBackdrop {...dialog}>
          <Dialog
            {...dialog}
            aria-labelledby="primary-modal-heading"
            style={{ overflow: "scroll" }}
          >
            <h1 id="primary-modal-heading">Primary modal</h1>
            <PrimaryTabs />
          </Dialog>
        </DialogBackdrop>
      </>
    );
  }
);

export default PrimaryModal;
