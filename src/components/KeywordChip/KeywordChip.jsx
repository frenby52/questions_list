import classes from './KeywordChip.module.scss';

function KeywordChip({ keyword, onClick }) {
  return (
    <button
      type="button"
      className={classes.chip}
      onClick={() => onClick?.(keyword)}
    >
      #{keyword}
    </button>
  );
}

export default KeywordChip;
