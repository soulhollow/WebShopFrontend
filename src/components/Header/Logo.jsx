import React from 'react';
import './Header.css';  // Ensure consistent styling
import logo from'./Image.png';

function Logo() {
  return (
    <div className="logo">

      <img src={logo} />
    </div>
  );
}
export default Logo;
