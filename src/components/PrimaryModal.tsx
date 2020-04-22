import * as React from "react";
import {
  useDialogState,
  Dialog,
  DialogDisclosure,
  DialogBackdrop,
  Button,
} from "reakit";
import PrimaryTabs from "./PrimaryTabs";
import cx from "../utils/cx";

type Props = React.ButtonHTMLAttributes<{}>;

const PrimaryModal = React.forwardRef<HTMLButtonElement, Props>(
  (props, ref) => {
    const dialog = useDialogState();
    return (
      <>
        <DialogDisclosure
          {...dialog}
          {...props}
          ref={ref}
          className={cx(props.className, "components-button is-primary")}
        >
          Modal...
        </DialogDisclosure>

        <DialogBackdrop
          {...dialog}
          className="components-modal__screen-overlay"
        >
          <Dialog
            {...dialog}
            aria-labelledby="primary-modal-heading"
            className="components-modal__frame"
          >
            <div className="components-modal__content">
              <div className="components-modal__header">
                <div className="components-modal__header-heading-container">
                  <h1
                    id="primary-modal-heading"
                    className="components-modal__header-heading"
                  >
                    Primary modal
                  </h1>
                </div>
                <Button onClick={dialog.hide} className="components-button">
                  Close
                </Button>
              </div>
              <PrimaryTabs />
            </div>
          </Dialog>
        </DialogBackdrop>
      </>
    );
  }
);

export default PrimaryModal;
