import classes from './AuthorCard.module.scss';
import checkIcon from '../../assets/icons/check.svg';
import telegramIcon from '../../assets/icons/telegram.svg';
import youtubeIcon from '../../assets/icons/youtube.svg';
import userCheckIcon from '../../assets/icons/user-check.svg';

// Соответствие type → иконка для ссылок профиля автора
const SOCIAL_ICONS = {
  telegram: telegramIcon,
  youtube: youtubeIcon,
  profile: userCheckIcon,
};

// Карточка автора: аватар с verified-бейджем, имя, роль, описание и соцсети.
// Используется на странице QuestionPage в правом блоке информации
function AuthorCard({ author }) {
  if (!author) return null;
  const { name, role, description, avatarSrc, isVerified, socials = [] } = author;

  return (
    <div className={classes.card}>
      <div className={classes.profile}>
        <div className={classes.avatarWrap}>
          {avatarSrc && (
            <img className={classes.avatar} src={avatarSrc} alt="" width={45} height={45} />
          )}
          {isVerified && (
            <img className={classes.verified} src={checkIcon} alt="" width={12} height={12} />
          )}
        </div>
        <div className={classes.info}>
          <p className={classes.name}>{name}</p>
          {role && <p className={classes.role}>{role}</p>}
        </div>
      </div>

      {description && <p className={classes.description}>{description}</p>}

      {socials.length > 0 && (
        <ul className={classes.socials}>
          {socials.map((social) => {
            const icon = SOCIAL_ICONS[social.type];
            if (!icon) return null;
            return (
              <li key={social.type}>
                <a className={classes.socialLink} href={social.url || '#'} aria-label={social.type}>
                  <img src={icon} alt="" width={24} height={24} />
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default AuthorCard;
