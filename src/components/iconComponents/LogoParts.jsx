import BaseIcon from "./BaseIcon";

const LogoIcon = (props) => (
  <BaseIcon shapeRendering="geometricPrecision" viewBox="0 0 23 23" {...props}>
    <path
      className="loader-parts"
      d="M9.78937 17.6382L3.45898 12.6091V12.6081V9.85144L4.88115 11.6012L9.78937 17.6382Z"
    />
    <path
      className="loader-parts"
      d="M10.6495 2V7.51114L4.88115 11.6012L3.45898 9.85145L10.6495 2Z"
    />
    <path
      className="loader-parts"
      d="M14.0454 4.68462V21L10.6494 18.3154V2L14.0454 4.68462Z"
    />

    <path
      className="loader-parts"
      d="M18.8786 16.2818L14.0449 21V16.5531L17.7577 14.6249L18.8786 16.2818Z"
    />
    <path
      className="loader-parts"
      d="M18.8791 14.0427V16.2818L17.7581 14.6249L15.0918 10.6851L18.8791 14.0427Z"
    />
  </BaseIcon>
);

export default LogoIcon;
