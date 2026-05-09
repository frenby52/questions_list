import classes from './MetaPill.module.scss';

function MetaPill({ label, value }) {
  return (
    <span className={classes.pill}>
      <span className={classes.label}>{label}</span>
      <span className={classes.value}>{value}</span>
    </span>
  );
}

export default MetaPill;
