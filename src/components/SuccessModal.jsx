import React from "react";

const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop with Blur */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-[#1F1F1F] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all scale-100 animate-[fadeIn_0.3s_ease-out]">
        
        {/* Success Icon Wrapper */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#19E6B6]/10 mb-6">
          <svg 
            className="h-8 w-8 text-[#19E6B6]" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={3} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </div>

        {/* Text Content */}
        <div className="text-center">
          <h3 className="text-3xl font-bebas text-white mb-2 tracking-wide">
            Message Sent!
          </h3>
          <p className="text-white/60 font-euclid text-sm mb-8">
            Thanks for reaching out. I've received your message and will get back to you shortly.
          </p>

          {/* Action Button */}
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-[#5043FA] hover:bg-[#19E6B6] text-white hover:text-black rounded-xl font-euclid font-medium transition-all duration-300 shadow-[0_4px_14px_0_rgba(80,67,250,0.39)] hover:shadow-[0_6px_20px_rgba(25,230,182,0.23)]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;