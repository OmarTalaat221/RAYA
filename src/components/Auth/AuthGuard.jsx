"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthToken } from "../../services/auth.service";

export default function AuthGuard({ children, mode = "guest" }) {
  const router = useRouter();
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    const token = getAuthToken();

    if (mode === "guest") {
      if (token) {
        router.replace("/");
        return;
      }
      setStatus("allowed");
    }

    if (mode === "protected") {
      if (!token) {
        router.replace("/login");
        return;
      }
      setStatus("allowed");
    }
  }, [mode, router]);

  if (status === "checking") {
    return (
      <div className="flex min-h-screen min-h-dvh items-center justify-center bg-[#f4f3f0]">
        <span className="h-8 w-8 animate-spin rounded-full border-3 border-main/20 border-t-main" />
      </div>
    );
  }

  return children;
}
