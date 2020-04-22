import * as React from "react";
import { useMenuState, Menu, MenuButton, MenuItem } from "reakit";
import PrimaryModal from "./PrimaryModal";
import cx from "../utils/cx";

type Props = React.ButtonHTMLAttributes<{}>;

const SecondaryDropdown = React.forwardRef<HTMLButtonElement, Props>(
  (props, ref) => {
    const menu = useMenuState({ gutter: 8 });
    return (
      <>
        <MenuButton
          {...menu}
          {...props}
          ref={ref}
          className={cx(props.className, "components-button is-primary")}
        >
          Secondary
        </MenuButton>
        <Menu {...menu} aria-label="Primary" className="menu">
          <MenuItem {...menu} className="components-button menu-item">
            Item 1
          </MenuItem>
          <MenuItem {...menu} className="components-button menu-item">
            Item 2
          </MenuItem>
          <MenuItem {...menu} as={PrimaryModal} className="menu-item" />
        </Menu>
      </>
    );
  }
);

export default SecondaryDropdown;
