import classes from './Footer.module.scss';
import { SOCIALS_ITEMS } from '../../constants/constants.js';

function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.inner}>
        <div className={classes.logoRow}>
          <span className={classes.logoText}>Yeahub</span>
        </div>

        <p className={classes.slogan}>Выбери, каким будет IT завтра, вместе с нами</p>

        <p className={classes.about}>
          YeaHub — это полностью открытый проект, призванный объединить и улучшить IT-сферу.
          Наш исходный код доступен для просмотра на GitHub. Дизайн проекта также открыт для
          ознакомления в Figma.
        </p>

        <div className={classes.divider} />

        <div className={classes.bottom}>
          <div className={classes.bottomLeft}>
            <span className={classes.copyright}>© 2024 YeaHub</span>
            <a className={classes.docsLink} href="#docs">Документы</a>
          </div>
          <span className={classes.socialCaption}>Ищите нас и в других соцсетях @yeahub_it</span>
          <ul className={classes.socials}>
            {SOCIALS_ITEMS.map((item) => (
              <li key={item.id}>
                <a className={classes.socialBtn} href={`#${item.title}`} aria-label={item.title}>
                  <img src={item.icon} alt={item.title} width={18} height={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
