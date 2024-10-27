import React from 'react';
import { useTheme } from './ThemeContext';
import { FaMoon } from 'react-icons/fa';
import { IoSunnySharp } from 'react-icons/io5';

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className='absolute m-4'>
      <button
        onClick={toggleTheme}
        className="text-text text-3xl"
      >
        {(theme=='light') ? <FaMoon /> : <IoSunnySharp />}
      </button>
    </div>
  );
};

export default ThemeToggleButton;
