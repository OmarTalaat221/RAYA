// components/Preloader.js
"use client";
import { useState, useEffect } from "react";
import styles from "./Preloader.module.css";

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  // ⭐ منع السكرول أثناء التحميل
  useEffect(() => {
    if (loading) {
      // منع السكرول
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
      document.documentElement.style.overflow = "hidden";
    } else {
      // السماح بالسكرول بعد انتهاء التحميل
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.documentElement.style.overflow = "";
    }

    // تنظيف عند unmount
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.documentElement.style.overflow = "";
    };
  }, [loading]);

  useEffect(() => {
    const handleLoad = () => {
      const images = Array.from(document.images);
      const pageImages = images.filter(
        (img) => !img.src.includes("gif-matrix")
      );
      const totalImages = pageImages.length;

      if (totalImages === 0) {
        setProgress(100);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => setLoading(false), 800);
        }, 500);
        return;
      }

      let loadedImages = 0;

      const updateProgress = () => {
        loadedImages++;
        const newProgress = Math.round((loadedImages / totalImages) * 100);
        setProgress(newProgress);

        if (loadedImages === totalImages) {
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => setLoading(false), 800);
          }, 500);
        }
      };

      pageImages.forEach((img) => {
        if (img.complete) {
          updateProgress();
        } else {
          img.addEventListener("load", updateProgress);
          img.addEventListener("error", updateProgress);
        }
      });
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    const fallbackTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 800);
    }, 8000);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(fallbackTimer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className={`${styles.preloader} ${fadeOut ? styles.hidden : ""}`}>
      <div className={styles.loaderContent}>
        <div className={styles.logoWrapper}>
          <img
            src="https://res.cloudinary.com/dkc5klynm/image/upload/v1771337960/gif-matrix_zy8aqw.gif"
            alt="Loading..."
            className={styles.logoGif}
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
