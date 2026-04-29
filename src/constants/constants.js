import detailsIcon from '../assets/icons/details.svg';
import studiedIcon from '../assets/icons/studied.svg';
import againIcon from '../assets/icons/again.svg';
import favoriteIcon from '../assets/icons/favorite.svg';
import figmaIcon from '../assets/icons/figma.svg';
import telegramIcon from '../assets/icons/telegram.svg';
import youtubeIcon from '../assets/icons/youtube.svg';
import tiktokIcon from '../assets/icons/tiktok.svg';
import githubIcon from '../assets/icons/github.svg';

export const SEARCH_DEBOUNCE_MS = 1000;

export const PAGE_SIZE_DEFAULT = 10;

export const ARRAY_TYPE_PROPERTIES = ['skills', 'complexity', 'rate'];

export const MENU_ITEMS = [
    { id: 'details', label: 'Подробнее', iconSrc: detailsIcon },
    { id: 'studied', label: 'Изучено', iconSrc: studiedIcon },
    { id: 'again', label: 'Заново', iconSrc: againIcon, disabled: true },
    { id: 'favorite', label: 'Избранное', iconSrc: favoriteIcon },
  ];

  export const NAV_LINKS = [
    { href: '#questions', label: 'База вопросов' },
    { href: '#trainer', label: 'Тренажёр' },
    { href: '#materials', label: 'Материалы' },
  ];

  export const COMPLEXITY_OPTIONS = [
    { value: [1, 2, 3], label: '1–3' },
    { value: [4, 5, 6], label: '4–6' },
    { value: [7, 8], label: '7–8' },
    { value: [9, 10], label: '9–10' },
  ];
  
  export const RATE_OPTIONS = [1, 2, 3, 4, 5];
  
  export const STATUS_OPTIONS = [
    { value: 'studied', label: 'Изученные' },
    { value: 'not_studied', label: 'Не изученные' },
    { value: 'all', label: 'Все' },
  ];
  
  export const COLLAPSED_SPECS_COUNT = 5;

  export const COLLAPSED_SKILLS_COUNT = 8;

  export const SOCIALS_ITEMS = [
    { id: 1, title: 'Figma', icon: figmaIcon },
    { id: 2, title: 'Telegram', icon: telegramIcon },
    { id: 3, title: 'YouTube', icon: youtubeIcon },
    { id: 4, title: 'TikTok', icon: tiktokIcon },
    { id: 5, title: 'GitHub', icon: githubIcon },
  ];