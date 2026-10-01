import classes from './QuestionActionsMenu.module.scss';
import { MENU_ITEMS } from '../config/menuItems';
import { useQuestionActions } from '../model/useQuestionActions';
import type { Question } from '@/entities/question';

interface QuestionActionsMenuProps {
  question: Question;
  onClose?: () => void;
}

export function QuestionActionsMenu({ question, onClose }: QuestionActionsMenuProps) {
  const { openDetails } = useQuestionActions();
  const handleMenuItemClick = (id: string) => {
    switch (id) {
      case 'details':
        openDetails(question.id);
        break;
      case 'studied':
        break;
      case 'favorite':
        break;

      default:
        break;
    }
    onClose?.();
  };

  return (
    <ul className={classes.menu} role="menu">
      {MENU_ITEMS.map((item) => {
        const itemClassName = item.disabled
          ? `${classes.menuItem} ${classes.menuItemDisabled}`
          : classes.menuItem;
        return (
          <li key={item.id}>
            <button
              type="button"
              className={itemClassName}
              disabled={item.disabled}
              onClick={() => handleMenuItemClick(item.id)}
            >
              <img src={item.iconSrc} alt="" width={18} height={18} />
              <span>{item.label}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
