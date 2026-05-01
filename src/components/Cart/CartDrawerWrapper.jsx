// components/Cart/CartDrawerWrapper.jsx
"use client";

import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { PRODUCTS } from "../FeaturedProducts/products";
import { useMemo } from "react";

const CartDrawer = dynamic(() => import("./CartDrawer"), { ssr: false });

export default function CartDrawerWrapper() {
  const isOpen = useSelector((s) => s.cart.isOpen);
  const cartItemIds = useSelector((s) => s.cart.items.map((i) => i.id));

  // Pick up to 3 recommendations not already in cart
  const recommendations = useMemo(() => {
    return PRODUCTS.filter(
      (p) => !cartItemIds.includes(p.id) && p.stockStatus === "in_stock"
    ).slice(0, 3);
  }, [cartItemIds]);

  // Only mount when open (or keep mounted if you prefer instant re-open)
  if (!isOpen) return null;

  return <CartDrawer recommendations={recommendations} />;
}
