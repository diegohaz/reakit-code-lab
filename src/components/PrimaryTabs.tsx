import * as React from "react";
import {
  useTabState,
  Tab,
  TabProps,
  TabList,
  TabPanel,
  useTooltipState,
  Tooltip,
  TooltipReference,
  VisuallyHidden,
  useDialogState,
} from "reakit";
import { FaAccessibleIcon } from "react-icons/fa";
import { MdViewModule } from "react-icons/md";
import PrimaryForm from "./PrimaryForm";
import EmojiGrid from "./EmojiGrid";
import cx from "../utils/cx";
import AlertDialog from "./AlertDialog";

function PrimaryTabs() {
  const tab = useTabState({ manual: true });
  return (
    <>
      <TabList
        {...tab}
        aria-label="Primary tabs"
        className="primary-tabs components-tab-panel__tabs"
      >
        <TooltipAlertTab {...tab} title="Accessible">
          <FaAccessibleIcon />
        </TooltipAlertTab>
        <TooltipAlertTab {...tab} title="Composable">
          <MdViewModule />
        </TooltipAlertTab>
      </TabList>

      <TabPanel {...tab} className="components-tab-panel__tab-content">
        {({ tabIndex, ...panelProps }) => (
          <div {...panelProps}>
            <PrimaryForm />
          </div>
        )}
      </TabPanel>

      <TabPanel {...tab} className="components-tab-panel__tab-content">
        {({ tabIndex, ...panelProps }) => (
          <div {...panelProps}>
            <EmojiGrid />
          </div>
        )}
      </TabPanel>
    </>
  );
}

type Props = TabProps & { title: string };

function TooltipAlertTab({ title, ...props }: Props) {
  const dialog = useDialogState();
  const tooltip = useTooltipState({ gutter: 4, placement: "bottom" });
  const onTabClick = () => {
    // Show dialog only when changing tabs
    if (props.selectedId !== props.currentId) {
      dialog.show();
    }
  };
  const onAlertDialogConfirm = () => {
    if (props.currentId) {
      props.select(props.currentId);
    }
  };
  return (
    <>
      <Tab {...props}>
        {(tabProps) => (
          <TooltipReference
            {...tooltip}
            {...tabProps}
            as="button"
            onClick={onTabClick}
            className={cx(
              props.className,
              "tab",
              "components-tab-panel__tabs-item",
              props.selectedId === tabProps.id && "is-active"
            )}
          >
            {props.children}
            <VisuallyHidden>{title}</VisuallyHidden>
          </TooltipReference>
        )}
      </Tab>

      <Tooltip
        {...tooltip}
        className="components-popover components-tooltip is-expanded is-without-arrow"
      >
        <div className="components-popover__content">{title}</div>
      </Tooltip>

      <AlertDialog
        {...dialog}
        aria-label="Confirm tab change"
        onConfirm={onAlertDialogConfirm}
      >
        Are you sure you want to leave this panel?
      </AlertDialog>
    </>
  );
}

export default PrimaryTabs;
