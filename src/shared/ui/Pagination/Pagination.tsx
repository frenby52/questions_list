import { useMemo } from 'react';
import classes from './Pagination.module.scss';
import arrowLeftIcon from '@/shared/assets/icons/arrow-left.svg';
import arrowRightIcon from '@/shared/assets/icons/arrow-right.svg';
import { getPages } from '@/shared/helpers/helpers';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  const pages = useMemo(() => getPages(totalPages, page), [totalPages, page]);

  if (totalPages <= 1) return null;

  const handlePageChange = (target: number | string) => {
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
        {pages.map((pageNumber: number | string, index: number) => (
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
