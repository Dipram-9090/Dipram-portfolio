import React from "react";

const BaseIcon = ({ 
  width = 25,
  height = 25,
  color = "currentColor", // Controls the Fill
  stroke = "none", // Controls the Stroke Color (default none)
  strokeWidth = 0, // Controls the Stroke Thickness
  viewBox = "0 0 25 25",
  className = "",
  style = {},
  children,
  ...props
}) => (
  <svg
    width={width}
    height={height}
    viewBox={viewBox}
    fill={color} // ✅ Sets Fill
    stroke={stroke} // ✅ Sets Stroke Color
    strokeWidth={strokeWidth} // ✅ Sets Stroke Width
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    {...props}
  >
    {children}
  </svg>
);

export default BaseIcon;
