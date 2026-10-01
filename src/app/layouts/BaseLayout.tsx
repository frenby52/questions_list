import classes from './BaseLayout.module.scss';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import { Outlet } from 'react-router-dom';

function BaseLayout() {
  return (
    <div className={classes.baseLayout}>
      <Header />
      <main className={classes.main}><Outlet /></main>
      <Footer />
    </div>
  );
}

export default BaseLayout;
