import ContentLoader from "react-content-loader";
import classes from './SkeletonQuestions.module.scss';

export const SkeletonQuestions = (props) => (
  <ContentLoader 
    className={classes.skeleton}
    speed={2}
    viewBox="0 0 400 300"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="25" y="15" rx="5" ry="5" width="218" height="19" /> 
    <rect x="26" y="62" rx="5" ry="5" width="362" height="119" /> 
    <rect x="28" y="195" rx="5" ry="5" width="355" height="23" /> 
    <rect x="13" y="21" rx="0" ry="0" width="1" height="1" /> 
    <rect x="28" y="232" rx="5" ry="5" width="355" height="23" /> 
    <rect x="28" y="267" rx="5" ry="5" width="355" height="23" />
  </ContentLoader>
);
