import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout/Layout.jsx';
import QuestionsPage from '@/pages/QuestionsPage/QuestionsPage.jsx';
import QuestionPage from '@/pages/QuestionPage/QuestionPage.jsx';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage.jsx';
import { ROUTES } from '@/constants/routes.ts';

export const router = createBrowserRouter([
    {
      path: ROUTES.INDEX,
      element: <Layout />, 
      errorElement: <ErrorMessage />,
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
          element: <QuestionPage />,
        },
        {
          path: ROUTES.NOT_FOUND,
          element: <ErrorMessage message="Страница не найдена" />,
        },
      ],
    },
  ]);