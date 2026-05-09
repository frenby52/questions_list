import classes from './QuestionAnswer.module.scss';
import ContentRenderer from '../ContentRenderer/ContentRenderer.jsx';

function QuestionAnswer({ title, content }) {
  return (
    <section className={classes.card}>
      <h2 className={classes.title}>{title}</h2>
      <div className={classes.content}>
        <ContentRenderer content={content} />
      </div>
    </section>
  );
}

export default QuestionAnswer;
