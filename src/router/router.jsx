import { createBrowserRouter, Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout.jsx';
import QuestionsPage from '../pages/QuestionsPage/QuestionsPage.jsx';
import { ROUTES } from '../constants/routes.js';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage.jsx';
import { Navigate } from 'react-router-dom';

export const router = createBrowserRouter([
    {
      path: ROUTES.INDEX,
      element: <Layout />, 
      children: [
        {
          index: true,
          element: <Navigate to={ROUTES.QUESTIONS} replace />, 
        },
        {
          path: ROUTES.QUESTIONS,
          element: <QuestionsPage />,
        },
        {
          path: ROUTES.QUESTION,
          element: <div>Question Page</div>,
        },
        {
          path: ROUTES.NOT_FOUND,
          element: <ErrorMessage message="Page not found">Go back to main</ErrorMessage>,
        },
      ],
    },
  ]);