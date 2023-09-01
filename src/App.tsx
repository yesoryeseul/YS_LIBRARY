import { Global, ThemeProvider } from "@emotion/react";
import { globalStyles } from "./styles/global";
import Testing from "./components/testing";
import Main from "./pages/main";
import { theme } from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <Main />
      <Testing />
    </ThemeProvider>
  );
}

export default App;
