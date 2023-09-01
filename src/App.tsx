import { Global } from "@emotion/react";
import { globalStyles } from "./styles/global";

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <h1>test</h1>
    </>
  );
}

export default App;
