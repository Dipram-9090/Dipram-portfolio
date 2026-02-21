{
  /* <path d="M12 8C12 8 12 8 11.24 7C10.36 5.84 9.06 5 7.5 5C5.01 5 3 7.01 3 9.5C3 10.43 3.28 11.29 3.76 12C4.57 13.21 12 21 12 21M12 8C12 8 12 8 12.76 7C13.64 5.84 14.94 5 16.5 5C18.99 5 21 7.01 21 9.5C21 10.43 20.72 11.29 20.24 12C19.43 13.21 12 21 12 21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> */
}

// import BaseIcon from "./BaseIcon";

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

const LikeOutline = (props) => (
  <BaseIcon viewBox="0 0 24 24" {...props}>
    <path
      d="M12 8C12 8 12 8 11.24 7C10.36 5.84 9.06 5 7.5 5C5.01 5 3 7.01 3 9.5C3 10.43 3.28 11.29 3.76 12C4.57 13.21 12 21 12 21M12 8C12 8 12 8 12.76 7C13.64 5.84 14.94 5 16.5 5C18.99 5 21 7.01 21 9.5C21 10.43 20.72 11.29 20.24 12C19.43 13.21 12 21 12 21"
      stroke-linecap="round" stroke-linejoin="round"
    />
  </BaseIcon>
);

export default LikeOutline;

{/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg> */}
