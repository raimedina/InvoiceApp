
import styles from './Header.module.css';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <HamburgerMenu />
      </div>
      <div className={styles.right}>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
