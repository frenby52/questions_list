import classes from './QuestionListHeader.module.scss';
import filterIcon from '../../assets/icons/filter.svg';

const QuestionListHeader = ({ title, onOpenFilter }) => {
    return (
        <header className={classes.header}>
        <h1 className={classes.title}>{title}</h1>
        <button
          type="button"
          className={classes.filterBtn}
          onClick={onOpenFilter}
        >
          <img src={filterIcon} alt="" width={20} height={20} />
        </button>
      </header>
    );
};

export default QuestionListHeader;