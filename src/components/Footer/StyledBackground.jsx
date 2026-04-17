import React from "react";
import "./style.css";
import cx from "classnames";

const StyledBackground = ({
  wave = false,
  children,
  style,
  className,
  color,
  variant = "default",
  motion = "soft",
}) => {
  return (
    <div
      style={style}
      className={cx("styled_background__", className, {
        white: color === "white",
        "styled_background__--footer": variant === "footer",
        "styled_background__--motion-none": motion === "none",
      })}
    >
      {wave && (
        <div className="styled_background__wave" aria-hidden="true">
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>

            <g className="parallax">
              <use
                xlinkHref="#gentle-wave"
                x={48}
                y={0}
                className="wave-layer wave-layer--1"
              />
              <use
                xlinkHref="#gentle-wave"
                x={48}
                y={2}
                className="wave-layer wave-layer--2"
              />
              <use
                xlinkHref="#gentle-wave"
                x={48}
                y={4}
                className="wave-layer wave-layer--3"
              />
            </g>
          </svg>
        </div>
      )}

      {children}
    </div>
  );
};

export default StyledBackground;
