import { Global, ThemeProvider } from '@emotion/react';
import { globalStyles } from './styles/global';

import { theme } from './styles/theme';
import { RouterProvider } from 'react-router-dom';
import router from 'route/routing';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
