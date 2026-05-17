"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { fetchGeoInfo } from "../../../store/geoSlice";

export default function AppPreloader({ children }) {
  const dispatch = useDispatch();
  const { initialized } = useSelector((state) => state.geo);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!initialized) {
      dispatch(fetchGeoInfo());
    }
  }, [mounted, initialized, dispatch]);

  // Show preloader until geo info is initialized
  const showPreloader = !mounted || !initialized;

  if (showPreloader) {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-label="Loading"
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#f4f3f0]"
      >
        <div className="relative h-20 w-20 sm:h-24 sm:w-24">
          <Image
            src="/assets/image/infinite-spinner.svg"
            alt=""
            fill
            priority
            sizes="96px"
            className="object-contain"
          />
        </div>
      </div>
    );
  }

  return children;
}
