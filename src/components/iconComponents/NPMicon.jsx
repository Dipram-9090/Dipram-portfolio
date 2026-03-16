import React from 'react';

const NPMicon = ({ size = 16, color = "currentColor", className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M0 0V16H16V0H0ZM13 13H11V5H8V13H3V3H13V13Z" 
        fill={color}
      />
    </svg>
  );
};

export default NPMicon;