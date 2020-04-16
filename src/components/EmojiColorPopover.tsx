import * as React from "react";
import {
  PopoverProps,
  Popover,
  PopoverArrow,
  PopoverArrowProps,
  VisuallyHidden,
  DialogDisclosure,
  Dialog,
  useDialogState,
} from "reakit";
import { useGridState, Grid, GridRow, GridCell } from "../future";
import EmojiGrid from "./EmojiGrid";

type Props = PopoverProps & PopoverArrowProps;

const tones = [
  ["No skin tone", "#FFC700"],
  ["Dark tone", "#5C4437"],
  ["Medium dark tone", "#A36134"],
  ["Medium tone", "#C78D61"],
  ["Medium Light tone", "#E6BA8F"],
  ["Light tone", "#FFDBB7"],
];

function EmojiColorPopover(props: Props) {
  const grid = useGridState({ loop: true, wrap: true });
  const dialog = useDialogState();
  return (
    <Popover {...props} aria-label="Emoji colors">
      <PopoverArrow {...props} />
      {props.visible && (
        <>
          <Grid {...grid} aria-label="Emojis">
            <GridRow {...grid}>
              {tones.map((tone) => (
                <Tone {...grid} tone={tone} key={tone[1]} />
              ))}
              <GridCell {...grid}>
                {({ role, ...cellProps }) => (
                  <span role={role}>
                    <DialogDisclosure {...dialog} {...cellProps}>
                      More tones
                    </DialogDisclosure>
                  </span>
                )}
              </GridCell>
            </GridRow>
          </Grid>
          <Dialog {...dialog} aria-label="More tones">
            {dialog.visible && <EmojiGrid combobox />}
          </Dialog>
        </>
      )}
    </Popover>
  );
}

type ToneProps = React.ComponentProps<typeof GridCell> & {
  tone: string[];
};

const Tone = React.forwardRef<HTMLSpanElement, ToneProps>(
  ({ tone, ...props }, ref) => {
    return (
      <GridCell
        {...props}
        ref={ref}
        style={{
          background: tone[1],
          width: 20,
          height: 20,
          borderRadius: 20,
          marginRight: 4,
          ...props.style,
        }}
      >
        {({ role, ...cellProps }) => (
          <span role={role}>
            <button {...cellProps}>
              <VisuallyHidden>{tone[0]}</VisuallyHidden>
            </button>
          </span>
        )}
      </GridCell>
    );
  }
);

export default EmojiColorPopover;
