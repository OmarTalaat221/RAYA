import React from "react";

export default function InnerPageWrapper({ children, className = "" }) {
  return (
    <div
      className={`pt-[160px] lg:pt-[200px] w-full min-h-screen ${className}`}
    >
      {children}
    </div>
  );
}
