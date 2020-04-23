import React from "react";
import PrimaryDropdown from "./components/PrimaryDropdown";
import SecondaryDropdown from "./components/SecondaryDropdown";
import PrimaryModal from "./components/PrimaryModal";

import "@wordpress/components/build-style/style.css";
import "./styles.css";

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
    </div>
  );
}

export default App;
