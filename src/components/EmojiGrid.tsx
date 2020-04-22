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
import data from "../data/emoji.json";
import cx from "../utils/cx";
import { Skin, Emoji } from "../utils/types";

const emojiGrid = chunk(data, 7) as Emoji[][];

type Props = { combobox?: boolean };

function EmojiGrid({ combobox }: Props) {
  const grid = useGridState({
    virtual: combobox,
    currentId: combobox ? null : undefined,
    wrap: true,
  });
  const GridComponent = combobox ? ComboboxGrid : Grid;
  return (
    <>
      {combobox && (
        <Combobox
          {...grid}
          type="text"
          className="components-text-control__input"
        />
      )}
      <GridComponent {...grid} aria-label="Emojis">
        {emojiGrid.map((emojis, i) => (
          <EmojiRow {...grid} emojis={emojis} key={i} id={`row-${i}`} />
        ))}
      </GridComponent>
    </>
  );
}

type EmojiRowProps = EmojiCellProps &
  React.ComponentProps<typeof GridRow> & { emojis: Emoji[] };

const EmojiRow = React.memo(
  React.forwardRef<HTMLButtonElement, EmojiRowProps>(
    ({ emojis, ...props }, ref) => (
      <GridRow {...props} ref={ref}>
        {emojis.map((emoji) => (
          <EmojiCell
            {...props}
            key={emoji.hexcode}
            id={`emoji-${emoji.hexcode}`}
            skins={emoji.skins}
          >
            {emoji.emoji}
          </EmojiCell>
        ))}
      </GridRow>
    )
  ),
  GridRow.unstable_propsAreEqual
);

type EmojiCellProps = React.ComponentProps<typeof GridCell> & {
  skins?: Skin[];
};

const EmojiCell = React.memo(
  React.forwardRef<HTMLButtonElement, EmojiCellProps>(
    ({ skins, ...props }, ref) => {
      const popover = usePopoverState({ placement: "top", modal: true });
      return (
        <>
          <GridCell {...props} ref={ref}>
            {({ role, ...cellProps }) => (
              <span role={role}>
                <PopoverDisclosure
                  {...popover}
                  {...cellProps}
                  className={cx(
                    cellProps.className,
                    "components-button",
                    cellProps["aria-selected"] && "is-primary"
                  )}
                >
                  {props.children}
                </PopoverDisclosure>
              </span>
            )}
          </GridCell>
          {skins && <EmojiColorPopover skins={skins} {...popover} />}
        </>
      );
    }
  ),
  GridCell.unstable_propsAreEqual
);

export default EmojiGrid;
