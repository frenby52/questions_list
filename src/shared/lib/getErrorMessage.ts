export function getErrorMessage(error: unknown): string | null {
  if (!error || typeof error !== 'object') return null;

  if ('status' in error) {
    if (error.status === 'FETCH_ERROR') return 'Проблема с соединением. Проверьте интернет.';
    if (error.status === 'PARSING_ERROR') return 'Не удалось обработать ответ сервера.';
    if (error.status === 404) return 'Данные не найдены.';
    if (typeof error.status === 'number' && error.status >= 500) {
      return 'Сервер временно недоступен. Попробуйте позже.';
    }

    const data = 'data' in error ? (error.data as { message?: string } | undefined) : undefined;
    return data?.message ?? `Ошибка запроса (${error.status}).`;
  }

  if ('message' in error && typeof error.message === 'string') {
    return error.message;
  }

  return 'Что-то пошло не так.';
}
