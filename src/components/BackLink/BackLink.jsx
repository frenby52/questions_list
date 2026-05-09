import { useNavigate } from 'react-router-dom';
import classes from './BackLink.module.scss';
import arrowLeftIcon from '../../assets/icons/arrow-left.svg';

function BackLink({ label = 'Назад' }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className={classes.back}
      onClick={() => navigate(-1)}
    >
      <img src={arrowLeftIcon} alt="" width={20} height={20} />
      <span className={classes.label}>{label}</span>
    </button>
  );
}

export default BackLink;
