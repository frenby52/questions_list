import classes from './Pagination.module.scss';
import arrowLeftIcon from '../../assets/icons/arrow-left.svg';
import arrowRightIcon from '../../assets/icons/arrow-right.svg';
import { getPages } from '../../helpers/utils/utils.js';
import { useMemo } from 'react';

function Pagination({ page, totalPages, onChange }) {
  const pages = useMemo(() => getPages(totalPages, page), [totalPages, page]);
  
  if (totalPages <= 1) return null;
 
  const handlePageChange = (target) => {
    if (typeof target !== 'number') return;
    if (target < 1 || target > totalPages || target === page) return;
    onChange(target);
  };

  return (
    <nav className={classes.pagination}>
      <button
        type="button"
        className={classes.arrow}
        disabled={page <= 1}
        onClick={() => handlePageChange(page - 1)}
      >
        <img src={arrowLeftIcon} alt="" width={28} height={28} />
      </button>

      <ul className={classes.list}>
        {pages.map((pageNumber, index) => (
          <li key={`${pageNumber}-${index}`}>
            {pageNumber === '…' ? (
              <span className={classes.dots}>…</span>
            ) : (
              <button
                type="button"
                className={`${classes.page} ${pageNumber === page ? classes.pageActive : ''}`.trim()}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            )}
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={classes.arrow}
        disabled={page >= totalPages} 
        onClick={() => handlePageChange(page + 1)}
      >
        <img src={arrowRightIcon} alt="" width={28} height={28} />
      </button>
    </nav>
  );
}

export default Pagination;
