// components/Cart/CartItemList.jsx
"use client";

import { memo } from "react";
import CartItem from "./CartItem";

const CartItemList = memo(function CartItemList({ items }) {
  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
});

export default CartItemList;
