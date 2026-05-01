// components/Cart/useAddToCart.js
"use client";

import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../store/cartSlice";
import { buildCartProduct } from "./cart.utils";

export default function useAddToCart() {
  const dispatch = useDispatch();

  const addToCart = useCallback(
    (product) => {
      const qty = product.quantity || 1;
      dispatch(addItem(buildCartProduct(product, qty)));
    },
    [dispatch]
  );

  return addToCart;
}
