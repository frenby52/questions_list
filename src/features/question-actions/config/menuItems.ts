import detailsIcon from '@/shared/assets/icons/details.svg';
import againIcon from '@/shared/assets/icons/again.svg';
import favoriteIcon from '@/shared/assets/icons/favorite.svg';

export const MENU_ITEMS = [
  { id: 'details', label: 'Подробнее', iconSrc: detailsIcon },
  { id: 'again', label: 'Заново', iconSrc: againIcon, disabled: true },
  { id: 'favorite', label: 'Избранное', iconSrc: favoriteIcon },
];