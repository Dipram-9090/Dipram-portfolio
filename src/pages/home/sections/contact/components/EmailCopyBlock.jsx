import React, { useState } from "react";
import MailIcon from "../../../../../components/iconComponents/MailIcon"; // Adjust path if necessary

const EmailCopyBlock = () => {
  const [emailCopied, setEmailCopied] = useState(false);
  const email = "dipramb9090@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setEmailCopied(true);

    // Reset back to normal after 2 seconds
    setTimeout(() => {
      setEmailCopied(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleCopyEmail}
      className="flex gap-4 items-start w-full sm:w-70 cursor-pointer group select-none transition-colors hover:text-[#19E6B6]"
    >
      {/* Icon Wrapper for Animation */}
      <div className="relative w-10 h-10">
        {/* Original Icon */}
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            emailCopied ? "scale-0 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <MailIcon width={40} height={40} />
        </div>
        {/* Success Checkmark (Inline SVG) */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            emailCopied ? "scale-100 opacity-100" : "scale-0 opacity-0"
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
            emailCopied
              ? "text-[#19E6B6]"
              : "text-white group-hover:text-[#19E6B6]"
          }`}
        >
          {emailCopied ? "Copied!" : "Email me"}
        </h4>
        <p
          className={`font-euclid transition-colors text-left underline duration-300 ${
            emailCopied
              ? "text-[#19E6B6]"
              : "text-white group-hover:text-[#19E6B6]"
          }`}
        >
          {email}
        </p>
      </div>
    </button>
  );
};

export default EmailCopyBlock;