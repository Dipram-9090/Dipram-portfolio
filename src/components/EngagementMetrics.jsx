import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";
import { Heart } from "lucide-react";
import { div } from "motion/react-client";
import LikeOutline from "./iconComponents/LikeOutline";
import LikeFilled from "./iconComponents/LikeFilled";

export default function EngagementMetrics() {
  const [visits, setVisits] = useState(0);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const fetchAndIncrementMetrics = async () => {
      const docRef = doc(db, "metrics", "portfolio");

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setVisits(docSnap.data().visits);
        setLikes(docSnap.data().likes);
      }

      if (!sessionStorage.getItem("visited")) {
        await updateDoc(docRef, {
          visits: increment(1),
        });
        setVisits((prev) => prev + 1);
        sessionStorage.setItem("visited", "true");
      }
    };

    fetchAndIncrementMetrics();
  }, []);

  const handleLike = async () => {
    if (hasLiked) return;

    const docRef = doc(db, "metrics", "portfolio");

    await updateDoc(docRef, {
      likes: increment(1),
    });

    setLikes((prev) => prev + 1);
    setHasLiked(true);
  };

  return (
    // 'w-full justify-center' ensures it sits dead center on the page
    // 'flex-wrap' ensures it doesn't break on very small mobile screens
    <div className="flex flex-row flex-wrap items-center justify-center gap-6 sm:gap-10 w-max rounded-full px-8 py-4 mx-auto lg:mb-12 mb-4">
      {/* Visit Counter (Inline) */}
      <div className="flex items-center gap-3">
        <p className="font-euclid font-medium text-black text-base uppercase">
          Visits
        </p>
        {/* translate-y-1 helps align the bottom of the Bebas font with the Euclid font */}
        <p className="font-bebas text-3xl sm:text-4xl text-black leading-none">
          {visits}
        </p>
      </div>

      {/* Subtle Vertical Divider */}
      <div className="hidden sm:block rounded-full w-px h-12 bg-black/80"></div>

      {/* Like Button & Counter (Inline) */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleLike}
          disabled={hasLiked}
          className={`px-6 py-2 rounded-full text-base font-euclid uppercase transition-all duration-300 ${
            hasLiked
              ? "bg-[#5043FA]/50 text-gray-200 cursor-not-allowed"
              : "bg-[#5043FA] text-white hover:bg-gray-800 hover:scale-105 active:scale-95"
          }`}
        >
          {hasLiked ? (
            <div className="flex gap-2">
              <p className="font-euclid">Liked</p>
              <LikeOutline width={22} height={22} color="#E5E7EB" stroke="#E5E7EB" strokeWidth={2} />
            </div>
          ) : (
            <div className="flex gap-2">
              <p className="font-euclid">Like Website</p>
              <LikeOutline width={22} height={22} color="transparent" stroke="white" strokeWidth={2} />
            </div>
          )}
        </button>
        <p className="font-euclid font-medium text-gray-600 text-sm">
          <div className="flex items-center gap-3">
            <p className="font-bebas text-3xl sm:text-4xl text-black leading-none">
              {likes}
            </p>
            <p className="font-euclid font-medium text-black text-base uppercase">
              Likes
            </p>
          </div>
        </p>
      </div>
    </div>
  );
}
