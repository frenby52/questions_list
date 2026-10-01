import classes from './QuestionHero.module.scss';
import filterIcon from '@/shared/assets/icons/filter.svg';
import type { Question } from '@/entities/question/model/types';

interface QuestionHeroProps {
  question: Question;
  onOpenDetails?: () => void;
}

export function QuestionHero({ question, onOpenDetails }: QuestionHeroProps) {
  const { title, description, imageSrc } = question;

  return (
    <article className={classes.hero}>
      {imageSrc && (
        <div className={classes.imageWrap}>
          <img className={classes.image} src={imageSrc} alt="" />
        </div>
      )}

      <div className={classes.body}>
        <div className={classes.titleRow}>
          <h1 className={classes.title}>{title}</h1>
          <button type="button" className={classes.filterBtn} onClick={onOpenDetails}>
            <img src={filterIcon} alt="" width={20} height={20} />
          </button>
        </div>
        {description && <p className={classes.description}>{description}</p>}
      </div>
    </article>
  );
}
