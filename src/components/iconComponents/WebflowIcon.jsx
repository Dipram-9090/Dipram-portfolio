import React from 'react';

const WebflowIcon = ({ size = 20, color = "currentColor", className = "" }) => {
  return (
    <svg 
      width={size} 
      height={(size * 13) / 20} 
      viewBox="0 0 20 13" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M20 0L13.6187 12.475H7.625L10.2969 7.30313H10.1781C7.97188 10.1656 4.68437 12.0469 0 12.475V7.37813C0 7.37813 2.99688 7.2 4.75938 5.35H0V0H5.34688V4.4H5.46562L7.65312 0H11.6969V4.37187H11.8156L14.0844 0H20Z" 
        fill={color} 
      />
    </svg>
  );
};

export default WebflowIcon;