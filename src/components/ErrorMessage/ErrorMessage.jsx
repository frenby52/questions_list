import classes from './ErrorMessage.module.scss';

function ErrorMessage({ error, link = '/', children }) {
  return (
    <div className={classes.error}>
      <div className={classes.text}>{error?.message ?? 'Что-то пошло не так'}</div>
      <a href={link} className={classes.link}>{children}</a>
    </div>
  );
}

export default ErrorMessage;
