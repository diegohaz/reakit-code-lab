import * as React from "react";
import { useMenuState, Menu, MenuButton, MenuItem } from "reakit";
import SecondaryDropdown from "./SecondaryDropdown";

type Props = React.ButtonHTMLAttributes<{}>;

const PrimaryDropdown = React.forwardRef<HTMLButtonElement, Props>(
  (props, ref) => {
    const menu = useMenuState();
    return (
      <>
        <MenuButton {...menu} {...props} ref={ref}>
          Primary
        </MenuButton>
        <Menu {...menu} aria-label="Primary">
          <MenuItem {...menu}>Item 1</MenuItem>
          <MenuItem {...menu}>Item 2</MenuItem>
          <MenuItem {...menu} as={SecondaryDropdown} />
        </Menu>
      </>
    );
  }
);

export default PrimaryDropdown;
