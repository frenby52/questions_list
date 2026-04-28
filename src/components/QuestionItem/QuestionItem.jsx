import { useEffect, useRef, useState } from 'react';
import classes from './QuestionItem.module.scss';
import chevronDownIcon from '../../assets/icons/chevron-down-brand.svg';
import kebabIcon from '../../assets/icons/kebab.svg';
import detailsIcon from '../../assets/icons/details.svg';
import studiedIcon from '../../assets/icons/studied.svg';
import againIcon from '../../assets/icons/again.svg';
import favoriteIcon from '../../assets/icons/favorite.svg';
import ContentRenderer from '../ContentRenderer/ContentRenderer.jsx';

const MENU_ITEMS = [
  { id: 'details', label: 'Подробнее', iconSrc: detailsIcon },
  { id: 'studied', label: 'Изучено', iconSrc: studiedIcon },
  { id: 'again', label: 'Заново', iconSrc: againIcon, disabled: true },
  { id: 'favorite', label: 'Избранное', iconSrc: favoriteIcon },
];

function QuestionItem({ question, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleIconClass = isOpen
    ? `${classes.toggleIcon} ${classes.toggleIconOpen}`
    : classes.toggleIcon;

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleMouseDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return;

      event.target.blur();
      setIsMenuOpen(false);
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const handleMenuItemClick = (itemId) => {
    setIsMenuOpen(false);
    console.log('was clicked ', itemId, question);
  };

  return (
    <article className={classes.item}>
      <header
        className={classes.header}
        onClick={() => setIsOpen((prev) => !prev)}
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

      {isOpen && (
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
