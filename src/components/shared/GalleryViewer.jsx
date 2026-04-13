// components/shared/GalleryViewer.jsx
"use client";
import "./style.css";
import { useEffect, useCallback } from "react";

const GalleryViewer = ({
  images,
  photoIndex,
  onClose,
  onMovePrev,
  onMoveNext,
  imageTitle,
  imageCaption,
}) => {
  const handleKeyPress = useCallback(
    (e) => {
      if (photoIndex >= 0) {
        switch (e.key) {
          case "ArrowLeft":
            onMovePrev();
            break;
          case "ArrowRight":
            onMoveNext();
            break;
          case "Escape":
            onClose();
            break;
        }
      }
    },
    [photoIndex, onMovePrev, onMoveNext, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (photoIndex >= 0) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [photoIndex]);

  if (photoIndex < 0) return null;

  return (
    <div className="gallery-overlay" onClick={onClose}>
      <div className="gallery-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="gallery-close" onClick={onClose}>
          <i className="ri-close-line"></i>
        </button>

        {/* Previous Button */}
        <button className="gallery-nav gallery-prev" onClick={onMovePrev}>
          <i className="ri-arrow-left-s-line"></i>
        </button>

        {/* Image */}
        <div className="gallery-content">
          <img
            src={images[photoIndex]}
            alt={imageTitle || `Image ${photoIndex + 1}`}
          />
          {(imageTitle || imageCaption) && (
            <div className="gallery-info">
              {imageTitle && <h4>{imageTitle}</h4>}
              {imageCaption && <p>{imageCaption}</p>}
            </div>
          )}
        </div>

        {/* Next Button */}
        <button className="gallery-nav gallery-next" onClick={onMoveNext}>
          <i className="ri-arrow-right-s-line"></i>
        </button>

        {/* Counter
        <div className="gallery-counter">
          {photoIndex + 1} / {images.length}
        </div> */}
      </div>
    </div>
  );
};

export default GalleryViewer;
