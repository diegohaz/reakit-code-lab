import * as React from "react";
import {
  useTabState,
  Tab as TabBase,
  TabProps as TabPropsBase,
  TabList,
  TabPanel,
  useTooltipState,
  Tooltip,
  TooltipReference,
  VisuallyHidden,
  useDialogState,
  Dialog,
  Button,
} from "reakit";
import { FaAccessibleIcon } from "react-icons/fa";
import { MdViewModule } from "react-icons/md";
import PrimaryForm from "./PrimaryForm";
import EmojiGrid from "./EmojiGrid";

function PrimaryTabs() {
  const tab = useTabState({ manual: true });
  return (
    <>
      <TabList {...tab} aria-label="Primary tabs" style={{ marginBottom: 25 }}>
        <Tab {...tab} title="Accessible">
          <FaAccessibleIcon />
        </Tab>
        <Tab {...tab} title="Composable">
          <MdViewModule />
        </Tab>
      </TabList>
      <TabPanel {...tab}>
        <PrimaryForm />
      </TabPanel>
      <TabPanel {...tab}>
        <EmojiGrid />
      </TabPanel>
    </>
  );
}

type TabProps = TabPropsBase & { title: string };

function Tab({ title, ...props }: TabProps) {
  const dialog = useDialogState();
  const tooltip = useTooltipState({ placement: "bottom" });
  const onTabClick = () => {
    // Show dialog only when changing tabs
    if (props.selectedId !== props.currentId) {
      dialog.show();
    }
  };
  const onAlertDialogConfirm = () => {
    dialog.hide();
    if (props.currentId) {
      props.select(props.currentId);
    }
  };
  return (
    <>
      <TabBase {...props}>
        {(tabProps) => (
          <TooltipReference
            {...tooltip}
            {...tabProps}
            as="button"
            onClick={onTabClick}
          >
            {props.children}
            <VisuallyHidden>{title}</VisuallyHidden>
          </TooltipReference>
        )}
      </TabBase>
      <Tooltip {...tooltip}>{title}</Tooltip>
      <Dialog
        {...dialog}
        role="alertdialog"
        aria-label="Confirm"
        style={{ width: 280 }}
      >
        <p>Are you sure?</p>
        <Button onClick={dialog.hide}>Cancel</Button>
        <Button onClick={onAlertDialogConfirm}>Confirm</Button>
      </Dialog>
    </>
  );
}

export default PrimaryTabs;
