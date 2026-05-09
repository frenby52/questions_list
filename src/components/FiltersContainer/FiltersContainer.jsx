import classes from './FiltersContainer.module.scss';
import closeIcon from '../../assets/icons/close.svg';

function FiltersContainer({ children, showClose = false, onClose }) {

    return (
        <aside className={classes.filtersContainer}>
            {showClose && (
                <button
                    type="button" className={classes.close} onClick={onClose}>
                    <img src={closeIcon} alt="" width={20} height={20} />
                </button>
            )}
            <div className={classes.body}>{children}</div>
        </aside>
    );
};

export default FiltersContainer;