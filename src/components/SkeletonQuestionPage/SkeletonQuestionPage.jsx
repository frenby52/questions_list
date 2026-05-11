import ContentLoader from 'react-content-loader';
import classes from './SkeletonQuestionPage.module.scss';

export function SkeletonQuestionPage() {
  return (
    <div className={classes.page} aria-busy="true" aria-hidden="true">
      <div className={classes.topBar}>
        <ContentLoader
          className={classes.topLoader}
          speed={2}
          width={120}
          height={36}
          viewBox="0 0 120 36"
          backgroundColor="#f8f8f8"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="8" width="100" height="20" rx="6" ry="6" />
        </ContentLoader>
      </div>

      <div className={classes.content}>
        <div className={classes.main}>
          <div className={classes.heroWrap}>
            <ContentLoader
              className={classes.heroLoader}
              speed={2}
              width="100%"
              height={150}
              viewBox="0 0 804 150"
              preserveAspectRatio="none"
              backgroundColor="#f8f8f8"
              foregroundColor="#ecebeb"
            >
              <rect x="24" y="12" width="420" height="28" rx="6" ry="6" />
              <rect x="24" y="56" width="756" height="20" rx="5" ry="5" />
              <rect x="24" y="88" width="720" height="20" rx="5" ry="5" />
            </ContentLoader>
          </div>

          <div className={classes.navWrap}>
            <ContentLoader
              className={classes.navLoader}
              speed={2}
              width="100%"
              height={72}
              viewBox="0 0 804 72"
              preserveAspectRatio="none"
              backgroundColor="#f8f8f8"
              foregroundColor="#ecebeb"
            >
              <rect x="200" y="12" width="170" height="48" rx="12" ry="12" />
              <rect x="434" y="12" width="170" height="48" rx="12" ry="12" />
            </ContentLoader>
          </div>

          <div className={classes.cardShell}>
            <ContentLoader
              className={classes.cardLoader}
              speed={2}
              width="100%"
              height={220}
              viewBox="0 0 804 220"
              preserveAspectRatio="none"
              backgroundColor="#f8f8f8"
              foregroundColor="#ecebeb"
            >
              <rect x="24" y="24" width="200" height="22" rx="6" ry="6" />
              <rect x="24" y="72" width="756" height="16" rx="4" ry="4" />
              <rect x="24" y="98" width="720" height="16" rx="4" ry="4" />
              <rect x="24" y="124" width="756" height="16" rx="4" ry="4" />
              <rect x="24" y="150" width="640" height="16" rx="4" ry="4" />
            </ContentLoader>
          </div>

          <div className={classes.cardShell}>
            <ContentLoader
              className={classes.cardLoader}
              speed={2}
              width="100%"
              height={300}
              viewBox="0 0 804 300"
              preserveAspectRatio="none"
              backgroundColor="#f8f8f8"
              foregroundColor="#ecebeb"
            >
              <rect x="24" y="24" width="240" height="22" rx="6" ry="6" />
              <rect x="24" y="68" width="756" height="16" rx="4" ry="4" />
              <rect x="24" y="94" width="756" height="16" rx="4" ry="4" />
              <rect x="24" y="120" width="700" height="16" rx="4" ry="4" />
              <rect x="24" y="146" width="756" height="16" rx="4" ry="4" />
              <rect x="24" y="172" width="756" height="16" rx="4" ry="4" />
              <rect x="24" y="198" width="756" height="16" rx="4" ry="4" />
              <rect x="24" y="224" width="680" height="16" rx="4" ry="4" />
              <rect x="24" y="250" width="756" height="16" rx="4" ry="4" />
              <rect x="24" y="276" width="520" height="16" rx="4" ry="4" />
            </ContentLoader>
          </div>
        </div>

        <aside className={classes.sidebar}>
          <ContentLoader
            className={classes.sidebarLoader}
            speed={2}
            width="100%"
            height={300}
            viewBox="0 0 344 340"
            backgroundColor="#f8f8f8"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" width="120" height="18" rx="4" ry="4" />
            <rect x="0" y="36" width="160" height="40" rx="8" ry="8" />
            <rect x="176" y="36" width="160" height="40" rx="8" ry="8" />
            <rect x="0" y="100" width="100" height="18" rx="4" ry="4" />
            <rect x="0" y="132" width="120" height="38" rx="10" ry="10" />
            <rect x="132" y="132" width="120" height="38" rx="10" ry="10" />
            <rect x="0" y="196" width="180" height="18" rx="4" ry="4" />
            <rect x="0" y="228" width="120" height="18" rx="4" ry="4" />
            <rect x="140" y="228" width="140" height="18" rx="4" ry="4" />
            <rect x="0" y="268" width="240" height="18" rx="4" ry="4" />
          </ContentLoader>
        </aside>
      </div>
    </div>
  );
}

export default SkeletonQuestionPage;
