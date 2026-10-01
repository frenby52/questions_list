import { createBrowserRouter, Navigate } from 'react-router-dom';
import BaseLayout from '@/app/layouts/BaseLayout';
import { QuestionsPage } from '@/pages/QuestionsPage';
import { QuestionPage } from '@/pages/QuestionPage';
import { ErrorMessage } from '@/shared/ui';
import { ROUTES } from '@/app/providers/router/config/routes';

export const router = createBrowserRouter([
    {
      path: ROUTES.INDEX,
      element: <BaseLayout />, 
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