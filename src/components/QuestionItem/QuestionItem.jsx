import { useState } from 'react';
import classes from './QuestionItem.module.scss';
import chevronDownIcon from '../../assets/icons/chevron-down-brand.svg';
import kebabIcon from '../../assets/icons/kebab.svg';
import ContentRenderer from '../ContentRenderer/ContentRenderer.jsx';
import { MENU_ITEMS } from '../../constants/constants.js';
import { useMenu } from '../../helpers/hooks/useMenu.js';

function QuestionItem({ question, defaultOpen = false }) {
  const [isQuestionOpen, setIsQuestionOpen] = useState(defaultOpen);
  const [isMenuOpen, setIsMenuOpen, menuRef] = useMenu();

  const toggleIconClass = isQuestionOpen
    ? `${classes.toggleIcon} ${classes.toggleIconOpen}`
    : classes.toggleIcon;

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <article className={classes.item}>
      <header
        className={classes.header}
        onClick={() => setIsQuestionOpen((prev) => !prev)}
      >
        <span className={classes.bullet} />
        <h3 className={classes.title}>{question.title}</h3>
        <button
          type="button"
          className={classes.toggle}
        >
          <img
            className={toggleIconClass}
            src={chevronDownIcon}
            alt=""
            width={20}
            height={20}
          />
        </button>
      </header>

      {isQuestionOpen && (
        <div className={classes.body}>
          <div className={classes.metaRow}>
            <div className={classes.meta}>
              <span className={classes.metaItem}>
                Рейтинг:
                <span className={classes.metaValue}>{question.rate ?? 0}</span>
              </span>
              <span className={classes.metaItem}>
                Сложность:
                <span className={classes.metaValue}>
                  {question.complexity ?? 0}
                </span>
              </span>
            </div>

            <div className={classes.actions} ref={menuRef}>
              <button
                type="button"
                className={classes.actionsBtn}
                onClick={(event) => {
                  event.stopPropagation();
                  setIsMenuOpen((prev) => !prev);
                }}
              >
                <img src={kebabIcon} alt="" width={18} height={18} />
              </button>

              {isMenuOpen && (
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
              )}
            </div>
          </div>

          {question.imageSrc && (
            <img
              className={classes.image}
              src={question.imageSrc}
              alt=""
              loading="lazy"
            />
          )}
          <div className={classes.shortAnswer}><ContentRenderer content={question.shortAnswer} /></div>
        </div>
      )}
    </article>
  );
}

export default QuestionItem;
