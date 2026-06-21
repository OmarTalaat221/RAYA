import React from "react";

const BottomBg = ({
  className = "",
  img = "/assets/image/shape_f4f3f0_transparent.webp",
  position = "bottom", // "bottom" | "top"
  flip = false,
}) => {
  const isTop = position === "top";

  return (
    <div
      aria-hidden="true"
      className={`
        pointer-events-none absolute left-0 z-20
        h-[12px] w-full select-none
        sm:h-[14px] md:h-[15px]
        ${isTop ? "top-[-1px]" : "bottom-[-1px]"}
        ${flip ? "rotate-180" : ""}
        ${className}
      `}
      style={{
        backgroundRepeat: "repeat-x",
        backgroundSize: "auto 100%",
        backgroundImage: `url("${img}")`,
      }}
    />
  );
};

export default React.memo(BottomBg);