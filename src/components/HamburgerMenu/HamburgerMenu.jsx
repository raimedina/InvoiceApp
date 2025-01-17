import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu, closeMenu } from '../../redux/menuSlice';
import styles from './HamburgerMenu.module.css';

const HamburgerMenu = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.menu.isOpen);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };

  const handleCloseMenu = () => {
    dispatch(closeMenu());
  };

  return (
    <div>
      <button
        onClick={handleToggleMenu}
        className={`${styles.hamburger} ${isOpen ? styles.open : ''} ${darkMode ? styles.dark : styles.light}`}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {isOpen && (
        <nav className={`${styles.menu} ${darkMode ? styles.darkMenu : ''}`} onClick={handleCloseMenu}>
          <a href="./">Home</a>
          <a href="/new-invoice">New Invoice</a>
        </nav>
      )}
    </div>
  );
};

export default HamburgerMenu;
