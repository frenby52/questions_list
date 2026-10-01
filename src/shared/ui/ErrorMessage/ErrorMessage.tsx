import { Link } from 'react-router-dom';
import classes from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message?: string | null;
  link?: string;
  linkText?: string;
  refetch?: (() => void) | null;
}

export function ErrorMessage({ message, link = '/', linkText = 'Вернуться на главную', refetch = null }: ErrorMessageProps) {
  return (
    <div className={classes.error}>
      <div className={classes.text}>{message ?? 'Что-то пошло не так'}</div>
      {refetch ? (
        <button onClick={refetch} className={classes.button}>Попробовать снова</button>
      ) : (
        <Link to={link} className={classes.link}>{linkText}</Link>
      )}
    </div>
  );
}
