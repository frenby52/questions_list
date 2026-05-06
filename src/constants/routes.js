  export const ROUTES = {
    INDEX: '/',
    QUESTIONS: '/questions',
    QUESTION: '/questions/:id',
    getQuestion: (id) => `/questions/${id}`,
    NOT_FOUND: '*',
  };