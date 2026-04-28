import classes from './FilterChip.module.scss';

function FilterChip({
  label,
  iconSrc,
  isActive = false,
  variant = 'default',
  onClick,
}) {
  const variantClass = variant === 'compact' ? classes.compact : classes.default;
  const activeClass = isActive ? classes.active : '';

  const handleIconError = (event) => {
    event.currentTarget.style.visibility = 'hidden';
  };

  const handleIconLoad = (event) => {
    event.currentTarget.style.visibility = 'visible';
  };

  return (
    <button
      type="button"
      className={`${classes.chip} ${variantClass} ${activeClass}`.trim()}
      onClick={onClick}
    >
      {iconSrc && (
        <span className={classes.icon}>
          <img
            className={classes.iconImg}
            src={iconSrc}
            alt=""
            onError={handleIconError}
            onLoad={handleIconLoad}
          />
        </span>
      )}
      <span className={classes.label}>{label}</span>
    </button>
  );
}

export default FilterChip;
