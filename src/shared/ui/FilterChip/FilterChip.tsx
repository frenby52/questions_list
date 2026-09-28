import type { SyntheticEvent } from 'react';
import classes from './FilterChip.module.scss';

type FilterChipVariant = 'default' | 'compact';

interface FilterChipProps {
  label: string;
  iconSrc?: string;
  isActive?: boolean;
  variant?: FilterChipVariant;
  onClick?: () => void;
}

export function FilterChip({label, iconSrc, isActive = false, variant = 'default', onClick}: FilterChipProps) {
  const variantClass = variant === 'compact' ? classes.compact : classes.default;
  const activeClass = isActive ? classes.active : '';

  const handleIconError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.visibility = 'hidden';
  };

  const handleIconLoad = (event: SyntheticEvent<HTMLImageElement>) => {
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
