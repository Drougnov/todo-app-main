import React from 'react';
import darkLogo from '../images/icon-moon.svg';
import lightLogo from '../images/icon-sun.svg';

const Header = (props) => {
  return (
    <header className={props.darkMode ? 'dark' : ''}>
      <h1 className="logo">TODO</h1>
      <button className='toggle-btn' onClick={props.toggleDarkMode}>{props.darkMode ? <img src={lightLogo} alt=""/>:<img src={darkLogo} alt=""/>}</button>
    </header>
  )
}

export default Header;