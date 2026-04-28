import classes from './Layout.module.scss';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';

function Layout({ children }) {
  return (
    <div className={classes.layout}>
      <Header />
      <main className={classes.main}>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
