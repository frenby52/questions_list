  export const ROUTES = {
    INDEX: '/',
    QUESTIONS: '/questions',
    QUESTION: '/questions/:id',
    getQuestion: (id: number) => `/questions/${id}`,
    NOT_FOUND: '*',
  } as const;