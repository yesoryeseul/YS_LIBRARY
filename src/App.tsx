import { Global } from "@emotion/react";
import { globalStyles } from "./styles/global";
import Testing from "./components/testing";

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <h1>test</h1>
      <Testing />
    </>
  );
}

export default App;
