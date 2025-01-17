import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/themeSlice';
import styles from './ThemeToggle.module.css';


const ThemeToggle = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' && !darkMode) {
      dispatch(toggleTheme());  
    }
  }, [dispatch, darkMode]);

  
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    document.body.classList.toggle('light', !darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className={`${styles.toggle} ${darkMode ? styles.dark : styles.light}`}
      aria-label="Toggle theme"
    >
      {darkMode ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;
