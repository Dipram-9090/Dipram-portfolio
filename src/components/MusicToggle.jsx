import { useState, useRef, useEffect } from "react";

const MusicToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Handle play/pause logic
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Optional: Lower the volume slightly so it's not overwhelming as background music
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4; // 40% volume
    }
  }, []);

  return (
    <>
      {/* The actual audio element. 
        'loop' ensures the music restarts when it finishes.
        Since it's in the public folder, we start the path with '/'
      */}
      <audio ref={audioRef} src="/audio/bg-music.mp3" loop />

      {/* The Toggle Button */}
      <button
        onClick={togglePlay}
        className={`fixed bottom-10 left-10 z-1000 flex items-center justify-center w-13 h-13 rounded-full transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 ${
          isPlaying 
            ? "bg-[#5043FA] text-white" 
            : "bg-white text-[#5043FA]"
        }`}
        aria-label="Toggle background music"
        style={{
          boxShadow: `
            0 8px 20px rgba(0, 0, 0, 0.12),
            0 2px 6px rgba(0, 0, 0, 0.08)
          `,
        }}
      >
        {isPlaying ? (
          // Volume UP Icon (Playing)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
          </svg>
        ) : (
          // Volume X Icon (Muted/Paused)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        )}
      </button>
    </>
  );
};

export default MusicToggle;