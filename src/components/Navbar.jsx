import React, { useRef } from 'react';
import './Navbar.css';

const Navbar = () => {
  const smex = useRef();

  const toggleSmallNav = () => {
    if (smex.current.style.display === 'block') {
      smex.current.style.display = 'none';
    } else {
      smex.current.style.display = 'block';
    }
  };

  return (
    <div className='realNav'>
      <nav>
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfcAGIpC0ltrgtEnbtM1ENeFuRSK2RSPwR9CXZxQqh3RVq4en6cmZAeemgOAs9p33PW8Y&usqp=CAU" 
          alt="Logo" 
          className="logo" 
        />
        <ul className="nav-links">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <div ref={smex} className='smallNav'>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
        <img 
          src="https://static-00.iconduck.com/assets.00/line-horizontal-3-icon-2048x1472-w7kzp4f5.png" 
          className='menu-icon' 
          alt="Menu Icon" 
          onClick={toggleSmallNav} 
        />
      </nav>
    </div>
  );
};

export default Navbar;
