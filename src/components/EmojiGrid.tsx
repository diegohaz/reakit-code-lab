import * as React from "react";
import chunk from "lodash/chunk";
import { usePopoverState, PopoverDisclosure } from "reakit";
import { useGridState, Grid, GridRow, GridCell } from "../future";
import EmojiColorPopover from "./EmojiColorPopover";

type Props = { virtual?: boolean };

const emojis = [
  "😀",
  "😁",
  "😂",
  "😃",
  "😄",
  "😅",
  "😆",
  "😇",
  "😈",
  "😉",
  "😊",
  "😋",
  "😌",
  "😍",
  "😎",
  "😏",
  "😐",
  "😑",
];

const emojiGrid = chunk(emojis, 5);

function EmojiGrid({ virtual }: Props) {
  const grid = useGridState({ virtual, wrap: true });
  return (
    <Grid {...grid} aria-label="Emojis">
      {emojiGrid.map((row, i) => (
        <GridRow {...grid} key={i}>
          {row.map((emoji) => (
            <EmojiCell {...grid} key={emoji}>
              {emoji}
            </EmojiCell>
          ))}
        </GridRow>
      ))}
    </Grid>
  );
}

type EmojiCellProps = React.ComponentProps<typeof GridCell>;

const EmojiCell = React.forwardRef<HTMLButtonElement, EmojiCellProps>(
  (props, ref) => {
    const popover = usePopoverState({ placement: "top", modal: true });
    return (
      <>
        <GridCell {...props} ref={ref}>
          {({ role, ...cellProps }) => (
            <span role={role}>
              <PopoverDisclosure {...popover} {...cellProps}>
                {props.children}
              </PopoverDisclosure>
            </span>
          )}
        </GridCell>
        <EmojiColorPopover {...popover} />
      </>
    );
  }
);

export default EmojiGrid;
