import classes from './SearchInput.module.scss';
import searchIcon from '@/shared/assets/icons/search.svg';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <label className={classes.wrapper}>
      <img className={classes.icon} src={searchIcon} alt="" width={20} height={20} />
      <input
        type="text"
        className={classes.input}
        value={value}
        placeholder={'Введите запрос...'}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
