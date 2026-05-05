import classes from './Layout.module.scss';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className={classes.layout}>
      <Header />
      <main className={classes.main}><Outlet /></main>
      <Footer />
    </div>
  );
}

export default Layout;
