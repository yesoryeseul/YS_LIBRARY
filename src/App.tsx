import { Global, ThemeProvider } from '@emotion/react';
import { globalStyles } from './styles/global';
import { RouterProvider } from 'react-router-dom';
import router from 'route/routing';
import theme from 'styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
