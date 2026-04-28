import classes from './Footer.module.scss';
import figmaIcon from '../../assets/icons/figma.svg';
import telegramIcon from '../../assets/icons/telegram.svg';
import youtubeIcon from '../../assets/icons/youtube.svg';
import tiktokIcon from '../../assets/icons/tiktok.svg';
import githubIcon from '../../assets/icons/github.svg';

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
              <li>
                <a className={classes.socialBtn} href="#figma" aria-label="Figma">
                  <img src={figmaIcon} alt="" width={14} height={14} />
                </a>
              </li>
              <li>
                <a className={classes.socialBtn} href="#telegram" aria-label="Telegram">
                  <img src={telegramIcon} alt="" width={16} height={16} />
                </a>
              </li>
              <li>
                <a className={classes.socialBtn} href="#youtube" aria-label="YouTube">
                  <img src={youtubeIcon} alt="" width={16} height={16} />
                </a>
              </li>
              <li>
                <a className={classes.socialBtn} href="#tiktok" aria-label="TikTok">
                  <img src={tiktokIcon} alt="" width={16} height={16} />
                </a>
              </li>
              <li>
                <a className={classes.socialBtn} href="#github" aria-label="GitHub">
                  <img src={githubIcon} alt="" width={18} height={18} />
                </a>
              </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
