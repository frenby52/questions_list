import classes from './QuestionNavigation.module.scss';
import arrowLeftIcon from '../../assets/icons/arrow-left.svg';
import arrowRightIcon from '../../assets/icons/arrow-right.svg';

function QuestionNavigation() {
  return (
    <nav className={classes.nav}>
      <button type="button" className={classes.btn} disabled>
        <img src={arrowLeftIcon} alt="" width={20} height={20} />
        <span>Предыдущий</span>
      </button>
      <button type="button" className={classes.btn} disabled>
        <span>Следующий</span>
        <img src={arrowRightIcon} alt="" width={20} height={20} />
      </button>
    </nav>
  );
}

export default QuestionNavigation;
