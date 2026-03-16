import React from 'react';

const FramerIcon = ({ size = 22, color = "currentColor", className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 22 22" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M4 0C2.93913 0 1.92172 0.421427 1.17157 1.17157C0.421427 1.92172 0 2.93913 0 4V18C0 19.0609 0.421427 20.0783 1.17157 20.8284C1.92172 21.5786 2.93913 22 4 22H18C19.0609 22 20.0783 21.5786 20.8284 20.8284C21.5786 20.0783 22 19.0609 22 18V4C22 2.93913 21.5786 1.92172 20.8284 1.17157C20.0783 0.421427 19.0609 0 18 0H4ZM5.91 3.5L11 8.59H5.91V13.682L11.364 19.5V13.682H16.091L11.001 8.591H16.091V3.5H5.91Z" 
        fill={color} 
      />
    </svg>
  );
};

export default FramerIcon;