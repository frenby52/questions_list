import classes from './KeywordChip.module.scss';

interface KeywordChipProps {
  keyword: string;
  onClick?: () => void;
}

export function KeywordChip({ keyword, onClick }: KeywordChipProps) {
  return (
    <button
      type="button"
      className={classes.chip}
      onClick={onClick}
    >
      #{keyword}
    </button>
  );
}
