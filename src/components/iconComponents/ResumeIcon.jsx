const ResumeIcon = ({ color = "currentColor" }) => {
  return (
    <div>
      <svg viewBox="0 0 16 20" fill={color} className="h-full w-auto">
        <path
          d="M10 3.05176e-05C10.1316 -0.000730088 10.262 0.0245173 10.3838 0.0742493C10.5056 0.12401 10.6165 0.197399 10.71 0.29007L15.71 5.29007C15.89 5.48006 16 5.73005 16 6.00003V18C16 19.1 15.1 20 14 20H2C0.9 20 0 19.1 0 18V2.00003C2.5749e-05 0.900052 0.900016 3.05176e-05 2 3.05176e-05H10ZM3 16V17H13V16H3ZM3 14H13V13H3V14ZM3 11H13V10H3V11ZM9 7.00003H14.5L9 1.50003V7.00003Z"
        />
      </svg>
    </div>
  );
};

export default ResumeIcon;
