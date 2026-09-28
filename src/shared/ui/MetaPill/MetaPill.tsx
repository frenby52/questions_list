import type { ReactNode } from 'react';
import classes from './MetaPill.module.scss';

interface MetaPillProps {
  label: ReactNode;
  value: ReactNode;
}

export function MetaPill({ label, value }: MetaPillProps) {
  return (
    <span className={classes.pill}>
      <span className={classes.label}>{label}</span>
      <span className={classes.value}>{value}</span>
    </span>
  );
}
