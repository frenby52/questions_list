import ContentLoader from 'react-content-loader';
import classes from './SkeletonQuestionsFilters.module.scss';

const COLORS = { bg: '#f8f8f8', fg: '#ecebeb' };

function SkeletonQuestionsFilters() {
  return (
    <div className={classes.wrap} aria-busy="true" aria-label="Загрузка фильтров">
      <ContentLoader
        speed={2}
        className={classes.loader}
        width="100%"
        height={520}
        viewBox="0 0 344 520"
        preserveAspectRatio="xMinYMin meet"
        backgroundColor={COLORS.bg}
        foregroundColor={COLORS.fg}
      >
        <rect x="0" y="0" width="344" height="48" rx="10" ry="10" />
        <rect x="0" y="84" width="96" height="16" rx="4" ry="4" />
        <rect x="0" y="112" width="84" height="36" rx="999" ry="999" />
        <rect x="92" y="112" width="100" height="36" rx="999" ry="999" />
        <rect x="200" y="112" width="72" height="36" rx="999" ry="999" />
        <rect x="0" y="156" width="88" height="36" rx="999" ry="999" />

        <rect x="0" y="228" width="112" height="16" rx="4" ry="4" />
        <rect x="0" y="256" width="76" height="36" rx="999" ry="999" />
        <rect x="84" y="256" width="104" height="36" rx="999" ry="999" />
        <rect x="196" y="256" width="90" height="36" rx="999" ry="999" />

        <rect x="0" y="328" width="88" height="16" rx="4" ry="4" />
        <rect x="0" y="356" width="96" height="36" rx="999" ry="999" />
        <rect x="104" y="356" width="120" height="36" rx="999" ry="999" />

        <rect x="0" y="428" width="100" height="16" rx="4" ry="4" />
        <rect x="0" y="456" width="80" height="36" rx="999" ry="999" />
        <rect x="88" y="456" width="96" height="36" rx="999" ry="999" />
        <rect x="190" y="456" width="110" height="36" rx="999" ry="999" />
      </ContentLoader>
    </div>
  );
}

export default SkeletonQuestionsFilters;
