import React from 'react';
import logo from 'src/assets/brunoman-logo.png';

const Bruno = ({ width = 50 }) => {
  return (
    <img src={logo} alt="Brunoman" style={{ width, height: 'auto' }} />
  );
};

export default Bruno;
