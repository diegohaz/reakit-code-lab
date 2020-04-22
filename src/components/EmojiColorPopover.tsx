import * as React from "react";
import {
  Button,
  PopoverProps,
  Popover,
  PopoverArrowProps,
  DialogDisclosure,
  DialogBackdrop,
  Dialog,
  useDialogState,
  PopoverArrow,
} from "reakit";
import { useGridState, Grid, GridRow, GridCell } from "../future";
import EmojiGrid from "./EmojiGrid";
import cx from "../utils/cx";
import { Skin } from "../utils/types";

type Props = PopoverProps &
  PopoverArrowProps & {
    skins: Skin[];
  };

function EmojiColorPopover({ skins, ...props }: Props) {
  const grid = useGridState({ loop: true, wrap: true });
  const dialog = useDialogState();
  return (
    <Popover
      {...props}
      aria-label="Emoji colors"
      className={cx(
        props.className,
        "popover components-popover is-alternate is-without-arrow",
        props.visible && "is-expanded"
      )}
    >
      <PopoverArrow {...props} className="popover-arrow" />
      {props.visible && (
        <>
          <Grid {...grid} aria-label="Emojis">
            <GridRow {...grid}>
              {skins.map((skin) => (
                <Tone {...grid} key={skin.emoji} emoji={skin.emoji} />
              ))}
              <GridCell {...grid}>
                {({ role, ...cellProps }) => (
                  <span role={role}>
                    <DialogDisclosure
                      {...dialog}
                      {...cellProps}
                      className="components-button"
                    >
                      More tones
                    </DialogDisclosure>
                  </span>
                )}
              </GridCell>
            </GridRow>
          </Grid>

          <DialogBackdrop
            {...dialog}
            className="components-modal__screen-overlay"
          >
            <Dialog
              {...dialog}
              aria-label="More tones"
              className="components-modal__frame"
              aria-labelledby="combobox-modal-heading"
            >
              {dialog.visible && (
                <div className="components-modal__content">
                  <div className="components-modal__header">
                    <div className="components-modal__header-heading-container">
                      <h1
                        id="combobox-modal-heading"
                        className="components-modal__header-heading"
                      >
                        Combobox modal
                      </h1>
                    </div>
                    <Button onClick={dialog.hide} className="components-button">
                      Close
                    </Button>
                  </div>
                  <EmojiGrid combobox />
                </div>
              )}
            </Dialog>
          </DialogBackdrop>
        </>
      )}
    </Popover>
  );
}

type ToneProps = React.ComponentProps<typeof GridCell> & {
  emoji: string;
};

function Tone({ emoji, ...props }: ToneProps) {
  return (
    <GridCell {...props}>
      {({ role, ...cellProps }) => (
        <span role={role}>
          <Button {...cellProps} className="components-button">
            {emoji}
          </Button>
        </span>
      )}
    </GridCell>
  );
}

export default EmojiColorPopover;
