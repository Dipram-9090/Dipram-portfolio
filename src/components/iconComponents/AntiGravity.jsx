const AntiGravityIcon = ({ color = "currentColor", size }) => {
  return (
    <div>
      <svg
        width={(size * 20) / 18}
        height={size}
        viewBox="0 0 20 18"
        fill={color}
      >
        <path
          d="M17.7142 17.59C18.8042 18.41 20.4442 17.86 18.9442 16.36C14.4442 12 15.3942 0 9.80417 0C4.21417 0 5.16417 12 0.664174 16.36C-0.975826 18 0.804174 18.41 1.89417 17.59C6.12417 14.73 5.84417 9.68 9.80417 9.68C13.7642 9.68 13.4842 14.73 17.7142 17.59Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export default AntiGravityIcon;