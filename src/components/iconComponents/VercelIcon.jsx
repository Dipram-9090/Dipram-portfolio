import React from 'react';

const VercelIcon = ({ size = 16, bgColor = "white", fgColor = "black", className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Note: In React, clip-path becomes clipPath */}
      <g clipPath="url(#clip0_8_4)">
        {/* Background rounded square */}
        <path 
          d="M12.25 0H3.75C1.67893 0 0 1.67893 0 3.75V12.25C0 14.3211 1.67893 16 3.75 16H12.25C14.3211 16 16 14.3211 16 12.25V3.75C16 1.67893 14.3211 0 12.25 0Z" 
          fill={bgColor}
        />
        {/* Inner triangle */}
        <path 
          d="M8 2.125L13.9375 12.4283H2.0625L8 2.125Z" 
          fill={fgColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_8_4">
          <rect width="16" height="16" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
};

export default VercelIcon;