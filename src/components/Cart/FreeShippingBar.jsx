// components/Cart/FreeShippingBar.jsx
"use client";

import { memo, useMemo } from "react";
import { Truck, PartyPopper } from "lucide-react";
import { formatMoney } from "./cart.utils";

const FreeShippingBar = memo(function FreeShippingBar({
  qualifies,
  remaining,
  threshold,
  subtotal,
}) {
  const progress = useMemo(() => {
    if (threshold <= 0) return 100;
    return Math.min(100, (subtotal / threshold) * 100);
  }, [subtotal, threshold]);

  if (qualifies) {
    return (
      <div
        className="flex items-center gap-3 rounded-xl border border-main/15
                    bg-gradient-to-r from-main/[0.06] to-main/[0.03] px-4 py-3"
      >
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center
                     rounded-full bg-main/12"
        >
          <PartyPopper size={15} className="text-main" strokeWidth={2} />
        </span>
        <p
          className="font-poppins! text-[12.5px] font-medium leading-snug
                     text-soft-black sm:text-[13px]"
        >
          Congratulations! You qualify for{" "}
          <span className="font-semibold text-main">Free Shipping</span>
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">
      <div className="flex items-center gap-3">
        <p
          className="font-poppins! text-[12.5px] font-medium leading-snug
                     text-gray-600 sm:text-[13px]"
        >
          Add{" "}
          <span className="font-semibold text-soft-black">
            {formatMoney(remaining)}
          </span>{" "}
          to get <span className="font-semibold text-main">Free Shipping</span>
        </p>
      </div>
      <div className="mt-3 h-[5px] w-full overflow-hidden rounded-full bg-gray-200/70">
        <div
          className="h-full rounded-full bg-gradient-to-r from-main to-[#7ed461]
                     transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
});

export default FreeShippingBar;
