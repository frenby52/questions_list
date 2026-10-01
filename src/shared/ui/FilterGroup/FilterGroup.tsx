import type { ReactNode } from 'react';
import classes from './FilterGroup.module.scss';

interface FilterGroupProps {
  title: ReactNode;
  children: ReactNode;
  showMoreLabel?: string | null;
  onShowMore?: () => void;
}

export function FilterGroup({ title, children, showMoreLabel, onShowMore }: FilterGroupProps) {
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
