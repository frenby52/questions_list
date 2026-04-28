import classes from './SearchInput.module.scss';
import searchIcon from '../../assets/icons/search.svg';

function SearchInput({ value, onChange }) {
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

export default SearchInput;
