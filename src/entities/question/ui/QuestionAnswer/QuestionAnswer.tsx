import classes from './QuestionAnswer.module.scss';
import { ContentRenderer } from '@/shared/ui';

interface QuestionAnswerProps {
  title: string;
  content?: string | null;
}

export function QuestionAnswer({ title, content }: QuestionAnswerProps) {
  return (
    <section className={classes.card}>
      <h2 className={classes.title}>{title}</h2>
      <div className={classes.content}>
        <ContentRenderer content={content} />
      </div>
    </section>
  );
}
