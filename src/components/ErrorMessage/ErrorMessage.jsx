import classes from './ErrorMessage.module.scss';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.js';

function ErrorMessage({ message, link = ROUTES.INDEX, children }) {
  return (
    <div className={classes.error}>
      <div className={classes.text}>{message ?? 'Что-то пошло не так'}</div>
      <Link to={link} className={classes.link}>{children}</Link>
    </div>
  );
}

export default ErrorMessage;
