import { useEffect, useRef, useState } from 'react';
import classes from './Header.module.scss';
import logoIcon from '../../assets/icons/logo.svg';
import chevronDownIcon from '../../assets/icons/chevron-down.svg';
import menuIcon from '../../assets/icons/menu.svg';

const NAV_LINKS = [
  { href: '#questions', label: 'База вопросов' },
  { href: '#trainer', label: 'Тренажёр' },
  { href: '#materials', label: 'Материалы' },
];

function Header() {
  const [isPrepOpen, setIsPrepOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const prepRef = useRef(null);
  const burgerRef = useRef(null);

  useEffect(() => {
    if (!isPrepOpen && !isMenuOpen) return;

    const handleMouseDown = (event) => {
      if (prepRef.current && !prepRef.current.contains(event.target)) {
        setIsPrepOpen(false);
      }
      if (burgerRef.current && !burgerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return; 
        event.target.blur();
        setIsPrepOpen(false);
        setIsMenuOpen(false);      
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPrepOpen, isMenuOpen]);

  const prepChevronClass = isPrepOpen
    ? `${classes.chevron} ${classes.chevronOpen}`
    : classes.chevron;

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <a className={classes.logo} href="/">
          <img src={logoIcon} alt="" width={33} height={33} />
          <span className={classes.logoText}>Yeahub</span>
        </a>

        <div className={classes.sectionBox} ref={prepRef}>
          <button
            type="button"
            className={classes.section}
            onClick={() => setIsPrepOpen((prev) => !prev)}
          >
            <span>Подготовка</span>
            <img
              className={prepChevronClass}
              src={chevronDownIcon}
              alt=""
              width={18}
              height={18}
            />
          </button>

          {isPrepOpen && (
            <div className={classes.dropdown} >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  className={classes.dropdownLink}
                  href={link.href}
                  onClick={() => setIsPrepOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <nav className={classes.nav}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} className={classes.navLink} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={classes.auth}>
          <a className={classes.loginLink} href="#login">Вход</a>
          <a className={classes.signupLink} href="#signup">Регистрация</a>
        </div>

        <div className={classes.burgerBox} ref={burgerRef}>
          <button
            type="button"
            className={classes.burger}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <img src={menuIcon} alt="" width={24} height={24} />
          </button>

          {isMenuOpen && (
            <div className={`${classes.dropdown} ${classes.dropdownRight}`} >
              <a
                className={classes.loginLink}
                href="#login"
                onClick={() => setIsMenuOpen(false)}
              >
                Вход
              </a>
              <a
                href="#signup"
                className={classes.signupLink}
                onClick={() => setIsMenuOpen(false)}
              >
                Регистрация
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
