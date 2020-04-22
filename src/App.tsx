import React from "react";
import { Checkbox, Button, useCheckboxState } from "reakit";
import PrimaryDropdown from "./components/PrimaryDropdown";
import SecondaryDropdown from "./components/SecondaryDropdown";
import PrimaryModal from "./components/PrimaryModal";
import EmojiGrid from "./components/EmojiGrid";

import "@wordpress/components/build-style/style.css";
import "./styles.css";

// function HTMLProps() {
//   return <Button onClick={() => alert("hi")}>Button</Button>;
// }

// function Options() {
//   return (
//     <Button focusable disabled onClick={() => alert("hi")}>
//       Button
//     </Button>
//   );
// }

// function AsProp() {
//   return (
//     <Checkbox as="button" checked>
//       Checkbox
//     </Checkbox>
//   );
// }

// function CustomAsProp() {
//   return (
//     <Checkbox as={Button} checked>
//       Checkbox
//     </Checkbox>
//   );
// }

// const As = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement>
// >((props, ref) => <div {...props} ref={ref} />);

// function CustomAsProp2() {
//   return (
//     <Checkbox
//       as={As}
//       onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
//         alert(event.target.checked)
//       }
//     >
//       Checkbox
//     </Checkbox>
//   );
// }

// function RenderProps() {
//   return (
//     <Checkbox>
//       {(htmlProps) => (
//         <div {...htmlProps}>
//           {htmlProps["aria-checked"] ? "Checked" : "Unchecked"}
//         </div>
//       )}
//     </Checkbox>
//   );
// }

// function State() {
//   const [checked, setChecked] = React.useState(false);
//   return (
//     <Checkbox checked={checked} onChange={() => setChecked(!checked)}>
//       {(htmlProps) => (
//         <div {...htmlProps}>
//           {htmlProps["aria-checked"] ? "Checked" : "Unchecked"}
//         </div>
//       )}
//     </Checkbox>
//   );
// }

// function CustomState() {
//   const [state, setState] = React.useState<
//     Array<string | number> | boolean | "indeterminate"
//   >([]);
//   return (
//     <>
//       <Checkbox state={state} setState={setState} value="apple">
//         {(htmlProps) => (
//           <button
//             {...htmlProps}
//             style={{ background: htmlProps["aria-checked"] ? "blue" : "none" }}
//           >
//             apple
//           </button>
//         )}
//       </Checkbox>
//       <Checkbox state={state} setState={setState} value="orange">
//         {(htmlProps) => (
//           <button
//             {...htmlProps}
//             style={{ background: htmlProps["aria-checked"] ? "blue" : "none" }}
//           >
//             orange
//           </button>
//         )}
//       </Checkbox>
//       <Checkbox state={state} setState={setState} value="grape">
//         {(htmlProps) => (
//           <button
//             {...htmlProps}
//             style={{ background: htmlProps["aria-checked"] ? "blue" : "none" }}
//           >
//             grape
//           </button>
//         )}
//       </Checkbox>
//       <pre>{JSON.stringify(state, null, 2)}</pre>
//     </>
//   );
// }

// function StateHooks() {
//   const checkbox = useCheckboxState({ state: [] });
//   return (
//     <>
//       <Checkbox {...checkbox} value="apple">
//         {(htmlProps) => (
//           <button
//             {...htmlProps}
//             style={{ background: htmlProps["aria-checked"] ? "blue" : "none" }}
//           >
//             apple
//           </button>
//         )}
//       </Checkbox>
//       <Checkbox {...checkbox} value="orange">
//         {(htmlProps) => (
//           <button
//             {...htmlProps}
//             style={{ background: htmlProps["aria-checked"] ? "blue" : "none" }}
//           >
//             orange
//           </button>
//         )}
//       </Checkbox>
//       <Checkbox {...checkbox} value="grape">
//         {(htmlProps) => (
//           <button
//             {...htmlProps}
//             style={{ background: htmlProps["aria-checked"] ? "blue" : "none" }}
//           >
//             grape
//           </button>
//         )}
//       </Checkbox>
//       <pre>{JSON.stringify(checkbox, null, 2)}</pre>
//     </>
//   );
// }

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
      {/* <br />
      <HTMLProps />
      <br />
      <CustomProps />
      <br />
      <AsProp />
      <br />
      <CustomAsProp />
      <br />
      <CustomAsProp2 />
      <br />
      <RenderProps />
      <br />
      <State />
      <br />
      <CustomState />
      <br />
      <StateHooks />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br /> */}
    </div>
  );
}

export default App;
