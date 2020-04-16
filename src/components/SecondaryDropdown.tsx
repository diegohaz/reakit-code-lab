import * as React from "react";
import { useMenuState, Menu, MenuButton, MenuItem } from "reakit";
import PrimaryModal from "./PrimaryModal";

type Props = React.ButtonHTMLAttributes<{}>;

const SecondaryDropdown = React.forwardRef<HTMLButtonElement, Props>(
  (props, ref) => {
    const menu = useMenuState();
    return (
      <>
        <MenuButton {...menu} {...props} ref={ref}>
          Secondary
        </MenuButton>
        <Menu {...menu} aria-label="Primary">
          <MenuItem {...menu}>Item 1</MenuItem>
          <MenuItem {...menu}>Item 2</MenuItem>
          <MenuItem {...menu} as={PrimaryModal} />
        </Menu>
      </>
    );
  }
);

export default SecondaryDropdown;
