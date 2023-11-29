import React, { useState, useEffect } from "react";
import { ImSun } from "react-icons/im";
import { IoIosMoon } from "react-icons/io";

const ThemeSwitcher = () => {
  const [isDark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Browser default theme detection
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      setDark(true);
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      document.documentElement.classList.remove("dark");
      setDark(false);
    }
  }, []);

  return (
    <button onClick={toggleTheme} className='text-2xl'>
      {isDark ? <ImSun /> : <IoIosMoon />}
    </button>
  );
};

export default ThemeSwitcher;
