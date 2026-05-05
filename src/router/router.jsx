import { createBrowserRouter, Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout.jsx';
import QuestionsPage from '../pages/QuestionsPage/QuestionsPage.jsx';
import { ROUTES } from '../constants/routes.js';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage.jsx';

export const router = createBrowserRouter([
    {
        path: ROUTES.INDEX,
        element: <Layout />, 
        children: [
            {
                path: ROUTES.INDEX,
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