import * as React from "react";
import chunk from "lodash/chunk";
import { usePopoverState, PopoverDisclosure } from "reakit";
import {
  useGridState,
  Grid,
  GridRow,
  GridCell,
  ComboboxGrid,
  Combobox,
} from "../future";
import EmojiColorPopover from "./EmojiColorPopover";

type Props = { combobox?: boolean };

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

function EmojiGrid({ combobox }: Props) {
  const grid = useGridState({
    virtual: combobox,
    currentId: combobox ? null : undefined,
    wrap: true,
  });
  const GridComponent = combobox ? ComboboxGrid : Grid;
  return (
    <>
      {combobox && <Combobox {...grid} />}
      <GridComponent {...grid} aria-label="Emojis">
        {emojiGrid.map((row, i) => (
          <GridRow {...grid} key={i}>
            {row.map((emoji) => (
              <EmojiCell {...grid} key={emoji}>
                {emoji}
              </EmojiCell>
            ))}
          </GridRow>
        ))}
      </GridComponent>
    </>
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
