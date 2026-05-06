import classes from './QuestionMenu.module.scss';
import { MENU_ITEMS } from '../../constants/constants.js';

const QuestionMenu = ({ handleMenuItemClick }) => {
    return (
        <ul className={classes.menu} role="menu">
          {MENU_ITEMS.map((item) => {
            const itemClassName = item.disabled
              ? `${classes.menuItem} ${classes.menuItemDisabled}`
              : classes.menuItem;
            return (
              <li key={item.id} >
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
};

export default QuestionMenu;