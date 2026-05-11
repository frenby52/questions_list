import ContentLoader from 'react-content-loader';
import classes from './SkeletonQuestionsFiltersAfterSpecs.module.scss';

const COLORS = { bg: '#f8f8f8', fg: '#ecebeb' };

function SkeletonQuestionsFiltersAfterSpecs() {
  return (
    <div className={classes.wrap} aria-busy="true" aria-label="Загрузка фильтров">
      <ContentLoader
        speed={2}
        className={classes.loader}
        width="100%"
        height={336}
        viewBox="0 0 344 336"
        preserveAspectRatio="xMinYMin meet"
        backgroundColor={COLORS.bg}
        foregroundColor={COLORS.fg}
      >
        <rect x="0" y="0" width="112" height="16" rx="4" ry="4" />
        <rect x="0" y="28" width="76" height="36" rx="999" ry="999" />
        <rect x="84" y="28" width="104" height="36" rx="999" ry="999" />
        <rect x="196" y="28" width="90" height="36" rx="999" ry="999" />

        <rect x="0" y="88" width="120" height="16" rx="4" ry="4" />
        <rect x="0" y="116" width="96" height="36" rx="999" ry="999" />
        <rect x="104" y="116" width="120" height="36" rx="999" ry="999" />

        <rect x="0" y="176" width="72" height="16" rx="4" ry="4" />
        <rect x="0" y="204" width="36" height="28" rx="6" ry="6" />
        <rect x="44" y="204" width="36" height="28" rx="6" ry="6" />
        <rect x="88" y="204" width="36" height="28" rx="6" ry="6" />
        <rect x="132" y="204" width="36" height="28" rx="6" ry="6" />
        <rect x="176" y="204" width="36" height="28" rx="6" ry="6" />

        <rect x="0" y="264" width="80" height="16" rx="4" ry="4" />
        <rect x="0" y="292" width="90" height="36" rx="999" ry="999" />
        <rect x="98" y="292" width="100" height="36" rx="999" ry="999" />
        <rect x="206" y="292" width="88" height="36" rx="999" ry="999" />
      </ContentLoader>
    </div>
  );
}

export default SkeletonQuestionsFiltersAfterSpecs;
