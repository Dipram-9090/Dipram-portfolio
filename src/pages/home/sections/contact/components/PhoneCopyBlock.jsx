import React, { useState } from "react";
import CallFooterIcon from "../../../../../components/iconComponents/CallFooterIcon"; // Adjust path if necessary

const PhoneCopyBlock = () => {
  const [phoneCopied, setPhoneCopied] = useState(false);
  const phoneNumber = "+91 923 269 6735";
  const cleanNumber = "+919232696735"; // For clipboard

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(cleanNumber);
    setPhoneCopied(true);

    // Reset back to normal after 2 seconds
    setTimeout(() => {
      setPhoneCopied(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleCopyPhone}
      className="flex gap-4 items-start w-full sm:w-70 cursor-pointer group select-none transition-colors hover:text-[#19E6B6]"
    >
      {/* Icon Wrapper for Animation */}
      <div className="relative w-10 h-10">
        {/* Original Icon */}
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            phoneCopied ? "scale-0 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <CallFooterIcon width={40} height={40} />
        </div>
        {/* Success Checkmark (Inline SVG) */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            phoneCopied ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#19E6B6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      </div>

      <div className="flex flex-col gap-1 w-full sm:w-45">
        <h4
          className={`font-euclid font-medium text-xl text-left transition-colors duration-300 ${
            phoneCopied
              ? "text-[#19E6B6]"
              : "text-white group-hover:text-[#19E6B6]"
          }`}
        >
          {phoneCopied ? "Copied!" : "Call me"}
        </h4>
        <p
          className={`font-euclid transition-colors text-left underline duration-300 ${
            phoneCopied
              ? "text-[#19E6B6]"
              : "text-white group-hover:text-[#19E6B6]"
          }`}
        >
          {phoneNumber}
        </p>
      </div>
    </button>
  );
};

export default PhoneCopyBlock;