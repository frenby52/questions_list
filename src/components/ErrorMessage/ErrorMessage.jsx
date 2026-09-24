import classes from './ErrorMessage.module.scss';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.js';

function ErrorMessage({ message, link = ROUTES.INDEX,  linkText = 'Вернуться на главную', refetch = null }) {
  return (
    <div className={classes.error}>
      <div className={classes.text}>{message ?? 'Что-то пошло не так'}</div>
      {refetch ? (
        <button onClick={refetch} className={classes.button}>Попробовать снова</button>
      ) : (
      <Link to={link} className={classes.link}>{linkText}</Link>)}
    </div>
  );
}

export default ErrorMessage;
