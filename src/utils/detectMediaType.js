// utils/detectMediaType.js

export const detectMediaType = (src) => {
  if (!src || typeof src !== "string") return "unknown";

  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".webp",
    ".avif",
    ".svg",
    ".bmp",
    ".ico",
  ];

  const videoExtensions = [
    ".mp4",
    ".webm",
    ".ogg",
    ".mov",
    ".avi",
    ".mkv",
    ".m4v",
  ];

  const lowerSrc = src.toLowerCase();

  // Check by extension
  if (imageExtensions.some((ext) => lowerSrc.endsWith(ext))) return "image";
  if (videoExtensions.some((ext) => lowerSrc.endsWith(ext))) return "video";

  // Check by URL patterns
  if (lowerSrc.includes("/video/") || lowerSrc.includes("video."))
    return "video";
  if (lowerSrc.includes("/image/") || lowerSrc.includes("img.")) return "image";

  // Check by query params or common CDN patterns
  if (lowerSrc.includes("format=mp4") || lowerSrc.includes("type=video"))
    return "video";
  if (lowerSrc.includes("format=jpg") || lowerSrc.includes("format=png"))
    return "image";
  // Cloudinary detection
  if (lowerSrc.includes("cloudinary")) {
    if (lowerSrc.includes("/video/")) return "video";
    if (lowerSrc.includes("/image/")) return "image";
  }

  return "unknown";
};

/**
 * Convert HEX color to RGBA
 * @param {string} hex - Hex color code
 * @param {number} alpha - Alpha value (0-1)
 * @returns {string} RGBA color string
 */
export const hexToRgba = (hex, alpha = 1) => {
  if (!hex) return `rgba(0, 0, 0, ${alpha})`;

  const cleanHex = hex.replace("#", "");

  // Handle shorthand hex (#fff)
  const fullHex =
    cleanHex.length === 3
      ? cleanHex
          .split("")
          .map((char) => char + char)
          .join("")
      : cleanHex;

  const r = parseInt(fullHex.substring(0, 2), 16);
  const g = parseInt(fullHex.substring(2, 4), 16);
  const b = parseInt(fullHex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const isVideo = (src) => detectMediaType(src) === "video";

export const isImage = (src) => detectMediaType(src) === "image";
