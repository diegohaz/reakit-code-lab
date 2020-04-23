import React from "react";
import { Button as WPButton } from "@wordpress/components";
import { Button, Checkbox, Tab, useCheckboxState, useCheckbox } from "reakit";
import PrimaryDropdown from "./components/PrimaryDropdown";
import SecondaryDropdown from "./components/SecondaryDropdown";
import PrimaryModal from "./components/PrimaryModal";

import "@wordpress/components/build-style/style.css";
import "./styles.css";

function HTMLProps() {
  return (
    <Button id="button-1" disabled onClick={() => alert("hi")}>
      Button
    </Button>
  );
}

function Options() {
  return (
    <Button focusable disabled onClick={() => alert("hi")}>
      Button
    </Button>
  );
}

function AsProp() {
  return (
    <Checkbox as="button" checked>
      Checkbox
    </Checkbox>
  );
}

function CustomAsProp() {
  return (
    <Checkbox as={WPButton} checked>
      Checkbox
    </Checkbox>
  );
}

function RenderProps() {
  return (
    // @ts-ignore
    <Tab>
      {(htmlProps) => <WPButton {...htmlProps}>{htmlProps.id}</WPButton>}
    </Tab>
  );
}

function State() {
  const [state, setState] = React.useState([] as any);
  return (
    <>
      <Checkbox state={state} setState={setState} value="apple" as={WPButton}>
        Apple
      </Checkbox>
      <Checkbox state={state} setState={setState} value="orange" as={WPButton}>
        Orange
      </Checkbox>
      <Checkbox state={state} setState={setState} value="grape" as={WPButton}>
        Grape
      </Checkbox>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
  );
}

function State2() {
  const [state, setState] = React.useState([] as any);
  return (
    <>
      <Checkbox state={state} setState={setState} value="apple">
        {(htmlProps) => (
          <WPButton {...htmlProps} isPrimary={!!htmlProps["aria-checked"]}>
            Apple
          </WPButton>
        )}
      </Checkbox>
      <Checkbox state={state} setState={setState} value="orange">
        {(htmlProps) => (
          <WPButton {...htmlProps} isPrimary={!!htmlProps["aria-checked"]}>
            Orange
          </WPButton>
        )}
      </Checkbox>
      <Checkbox state={state} setState={setState} value="grape">
        {(htmlProps) => (
          <WPButton {...htmlProps} isPrimary={!!htmlProps["aria-checked"]}>
            Grape
          </WPButton>
        )}
      </Checkbox>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
  );
}

function StateHook() {
  const checkbox = useCheckboxState({ state: [] });
  const checkbox1 = useCheckbox({ ...checkbox, value: "apple" });
  return (
    <>
      <WPButton {...checkbox1} isPrimary={!!checkbox1["aria-checked"]}>
        Apple
      </WPButton>
      <pre>{JSON.stringify(checkbox.state, null, 2)}</pre>
    </>
  );
}

function App() {
  return (
    <div>
      <PrimaryDropdown />
      <br />
      <br />
      <SecondaryDropdown />
      <br />
      <br />
      <PrimaryModal />
      <br />
      <br />
      <HTMLProps />
      <br />
      <br />
      <Options />
      <br />
      <br />
      <AsProp />
      <br />
      <br />
      <CustomAsProp />
      <br />
      <br />
      <RenderProps />
      <br />
      <br />
      <State />
      <br />
      <br />
      <State2 />
      <br />
      <br />
      <StateHook />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default App;
