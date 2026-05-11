import ContentLoader from 'react-content-loader';
import classes from './SkeletonQuestionList.module.scss';

const ROW_COUNT = 8;
const COLORS = { bg: '#f8f8f8', fg: '#ecebeb' };

function SkeletonQuestionList() {
  return (
    <section className={classes.section} aria-busy="true" aria-label="Загрузка списка вопросов">
      <header className={classes.listHeader}>
        <ContentLoader
          className={classes.headerLoader}
          speed={2}
          width="100%"
          height={48}
          viewBox="0 0 760 48"
          preserveAspectRatio="none"
          backgroundColor={COLORS.bg}
          foregroundColor={COLORS.fg}
        >
          <rect x="0" y="10" width="320" height="28" rx="8" ry="8" />
          <rect x="716" y="6" width="44" height="36" rx="8" ry="8" />
        </ContentLoader>
      </header>

      <ul className={classes.list}>
        {Array.from({ length: ROW_COUNT }, (_, index) => {
          const barWidth = 420 + ((index * 71) % 220);
          return (
            <li key={index} className={classes.item}>
              <ContentLoader
                className={classes.rowLoader}
                speed={2}
                width="100%"
                height={48}
                viewBox="0 0 720 48"
                preserveAspectRatio="none"
                backgroundColor={COLORS.bg}
                foregroundColor={COLORS.fg}
              >
                <rect x="0" y="14" width={barWidth} height="20" rx="6" ry="6" />
              </ContentLoader>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default SkeletonQuestionList;
