import Layout from 'components/Layout';
import Main from 'pages/main';
import SearchPage from 'pages/search';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: '/:search',
        element: <SearchPage />,
      },
    ],
  },
]);

export default router;
