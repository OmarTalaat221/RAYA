// components/Cart/CartIcon.jsx
"use client";

import { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingBag } from "lucide-react";
import { toggleCart } from "../../store/cartSlice";

const CartIcon = memo(function CartIcon() {
  const dispatch = useDispatch();
  const itemCount = useSelector((s) => s.cart.itemCount);

  const handleClick = useCallback(() => {
    dispatch(toggleCart());
  }, [dispatch]);

  return (
    <button
      onClick={handleClick}
      className="group relative flex h-10 w-10 items-center justify-center rounded-full
                 transition-colors duration-200 hover:bg-gray-100
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main/40"
      aria-label={`Shopping cart${itemCount > 0 ? `, ${itemCount} items` : ""}`}
    >
      <ShoppingBag
        size={20}
        strokeWidth={1.6}
        className="text-soft-black transition-colors duration-200 group-hover:text-main"
      />
      {itemCount > 0 && (
        <span
          className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center
                     justify-center rounded-full bg-main px-1 text-[10px]
                     font-bold leading-none text-white shadow-sm"
        >
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </button>
  );
});

export default CartIcon;
