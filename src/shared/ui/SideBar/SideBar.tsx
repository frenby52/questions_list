import type { ReactNode } from 'react';
import classes from './SideBar.module.scss';
import closeIcon from '@/shared/assets/icons/close.svg';

interface SideBarProps {
  children: ReactNode;
  showClose?: boolean;
  onClose?: () => void;
}

export function SideBar({ children, showClose = false, onClose }: SideBarProps) {
  return (
    <aside className={classes.sidebar}>
      {showClose && (
        <button
          type="button" className={classes.close} onClick={onClose}>
          <img src={closeIcon} alt="" width={20} height={20} />
        </button>
      )}
      <div className={classes.body}>{children}</div>
    </aside>
  );
}
