// components/PageBanner/PageBanner.jsx

"use client";
import { useState, useEffect, useRef } from "react";
import { detectMediaType, hexToRgba } from "../../utils/detectMediaType";

const alignClasses = {
  right: "items-end text-right",
  center: "items-center text-center",
  left: "items-start text-left",
};

const PageBanner = ({
  mediaSrc = "",
  gradientColor = "#023048",
  align = "right",
  overlayStrength = 60,
  parallax = false,
  showBottomFade = true,
  bottomFadeColor = "white",
  // ✅ Props جديدة للـ Gradient المخصص
  useWhiteGradient = false,
  children,
  className = "",
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef(null);
  const imgRef = useRef(null);

  const mediaType = detectMediaType(mediaSrc);
  const hasMedia = mediaSrc && mediaType !== "unknown";

  useEffect(() => {
    if (!parallax) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [parallax]);

  useEffect(() => {
    if (mediaType === "image" && mediaSrc) {
      const img = new Image();
      img.src = mediaSrc;

      img.onload = () => {
        setIsLoaded(true);
      };

      img.onerror = () => {
        setIsLoaded(true);
      };

      if (img.complete) {
        setIsLoaded(true);
      }
    }
  }, [mediaType, mediaSrc]);

  useEffect(() => {
    if (mediaType === "video" && videoRef.current) {
      const video = videoRef.current;

      const handleLoaded = () => {
        setIsLoaded(true);
      };

      video.addEventListener("loadeddata", handleLoaded);
      video.addEventListener("canplay", handleLoaded);
      video.addEventListener("playing", handleLoaded);

      if (video.readyState >= 3) {
        setIsLoaded(true);
      }

      return () => {
        video.removeEventListener("loadeddata", handleLoaded);
        video.removeEventListener("canplay", handleLoaded);
        video.removeEventListener("playing", handleLoaded);
      };
    }
  }, [mediaType, mediaSrc]);

  useEffect(() => {
    setIsLoaded(false);
  }, [mediaSrc]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isLoaded) {
        setIsLoaded(true);
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [mediaSrc]);

  // ✅ Gradient Styles - مع الـ White Gradient الجديد
  const overlayGradient = useWhiteGradient
    ? `linear-gradient(0deg, 
        #ffffff 0%, 
        rgba(244, 221, 165, 0.65) 47.28%, 
        rgba(224, 157, 0, 0) 100%)`
    : `linear-gradient(180deg, 
        ${hexToRgba(gradientColor, overlayStrength / 100)} 0%, 
        ${hexToRgba(gradientColor, 0.35)} 81.77%, 
        ${hexToRgba(gradientColor, 0)} 100%)`;

  const solidGradient = useWhiteGradient
    ? `linear-gradient(0deg, 
        #ffffff 0%, 
        rgba(244, 221, 165, 0.65) 47.28%, 
        rgba(224, 157, 0, 0) 100%)`
    : `linear-gradient(180deg, 
        ${gradientColor} 0%, 
        ${hexToRgba(gradientColor, 0.7)} 50%, 
        ${hexToRgba(gradientColor, 0.35)} 81.77%, 
        ${hexToRgba(gradientColor, 0)} 100%)`;

  const parallaxTransform = parallax
    ? `translateY(${scrollY * 0.3}px)`
    : "none";

  return (
    <section
      className={`relative w-full h-screen overflow-hidden ${className}`}
    >
      {/* ===== Background Layer ===== */}
      <div className="absolute inset-0 w-full h-full">
        {/* Image Background */}
        {hasMedia && mediaType === "image" && (
          <img
            ref={imgRef}
            src={mediaSrc}
            alt=""
            onLoad={() => setIsLoaded(true)}
            onError={() => setIsLoaded(true)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: isLoaded ? 1 : 0,
              transition: "opacity 0.7s ease-in-out",
              transform: parallaxTransform,
            }}
          />
        )}

        {/* Video Background */}
        {hasMedia && mediaType === "video" && (
          <video
            ref={videoRef}
            src={mediaSrc}
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: isLoaded ? 1 : 0,
              transition: "opacity 0.7s ease-in-out",
              transform: parallaxTransform,
            }}
          />
        )}

        {/* Loading State / Fallback Background */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: solidGradient,
            opacity: isLoaded ? 0 : 1,
            transition: "opacity 0.7s ease-in-out",
            zIndex: 1,
          }}
        />

        {/* Gradient Overlay */}
        {hasMedia && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: overlayGradient,
              zIndex: 10,
            }}
          />
        )}

        {/* Solid Gradient (no media) */}
        {!hasMedia && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: solidGradient,
            }}
          />
        )}
      </div>

      {/* ===== Content Layer ===== */}
      <div
        className={`
          relative z-20 w-full h-full
          flex flex-col justify-center
          ${alignClasses[align] || alignClasses.right}
          container mx-auto
          pt-24 md:pt-28 lg:pt-32
          pb-16 md:pb-20 lg:pb-24
        `}
      >
        {children}
      </div>

      {/* ===== Bottom Fade ===== */}
      {showBottomFade && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "80px",
            background: `linear-gradient(to top, ${bottomFadeColor} 0%, transparent 100%)`,
            zIndex: 15,
            pointerEvents: "none",
          }}
        />
      )}
    </section>
  );
};

export default PageBanner;
