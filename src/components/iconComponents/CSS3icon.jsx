import React from 'react';

const CSS3icon = ({ size = 20, color = "currentColor", className = "" }) => {
  return (
    <svg 
      width={size} 
      height={(size * 18) / 20} // Maintains the 20:18 aspect ratio
      viewBox="0 0 20 18" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M2.94 0L2.29 3.34H15.88L15.44 5.5H1.86L1.2 8.83H14.79L14.03 12.64L8.55 14.45L3.8 12.64L4.13 11H0.79L0 15L7.85 18L16.9 15L18.1 8.97L18.34 7.76L19.88 0H2.94Z" 
        fill={color} 
      />
    </svg>
  );
};

export default CSS3icon;