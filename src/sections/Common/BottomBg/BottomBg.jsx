import React from "react";

const BottomBg = ({
  className = "",
  img = "/assets/image/shape_f4f3f0_transparent.png",
}) => {
  return (
    <div
      aria-hidden="true"
      className={`
        pointer-events-none absolute bottom-[-1px] left-0 z-20
        h-[12px] w-full select-none
        sm:h-[14px] md:h-[15px]
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
