import classes from './FilterGroup.module.scss';

function FilterGroup({ title, children, showMoreLabel, onShowMore }) {
  return (
    <div className={classes.group}>
      <h3 className={classes.title}>{title}</h3>
      <div className={classes.body}>{children}</div>
      {showMoreLabel && (
        <button type="button" className={classes.more} onClick={onShowMore}>
          {showMoreLabel}
        </button>
      )}
    </div>
  );
}

export default FilterGroup;
