import detailsIcon from '@/shared/assets/icons/details.svg';
import studiedIcon from '@/shared/assets/icons/studied.svg';
import againIcon from '@/shared/assets/icons/again.svg';
import favoriteIcon from '@/shared/assets/icons/favorite.svg';

export const SEARCH_DEBOUNCE_MS = 1000;

export const PAGE_SIZE_DEFAULT = 10;

export const ARRAY_TYPE_PROPERTIES = ['skills', 'keywords', 'complexity', 'rate'] as const;

export const MENU_ITEMS = [
    { id: 'details', label: 'Подробнее', iconSrc: detailsIcon },
    { id: 'studied', label: 'Изучено', iconSrc: studiedIcon },
    { id: 'again', label: 'Заново', iconSrc: againIcon, disabled: true },
    { id: 'favorite', label: 'Избранное', iconSrc: favoriteIcon },
  ];

  export const COMPLEXITY_OPTIONS = [
    { value: '1,2,3', label: '1–3' },
    { value: '4,5,6', label: '4–6' },
    { value: '7,8', label: '7–8' },
    { value: '9,10', label: '9–10' },
  ];
  
  export const RATE_OPTIONS = [1, 2, 3, 4, 5];
  
  export const STATUS_OPTIONS = [
    { value: 'studied', label: 'Изученные' },
    { value: 'not_studied', label: 'Не изученные' },
    { value: 'all', label: 'Все' },
  ];
  
  export const COLLAPSED_SPECS_COUNT = 5;

  export const COLLAPSED_SKILLS_COUNT = 8;