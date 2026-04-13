"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const WORKFLOW_PATHS = ["/contract", "/privacy-policy"];

export function useUnsavedChangesWarning(
  hasUnsavedChanges,
  onSave,
  setHasUnsavedChanges,
  resetPage = null
) {
  const router = useRouter();
  const isNavigatingRef = useRef(false);
  const hasUnsavedChangesRef = useRef(hasUnsavedChanges);
  const onSaveRef = useRef(onSave);
  const setHasUnsavedChangesRef = useRef(setHasUnsavedChanges);
  const resetPageRef = useRef(resetPage);

  useEffect(() => {
    hasUnsavedChangesRef.current = hasUnsavedChanges;
  }, [hasUnsavedChanges]);

  useEffect(() => {
    onSaveRef.current = onSave;
  }, [onSave]);

  useEffect(() => {
    setHasUnsavedChangesRef.current = setHasUnsavedChanges;
  }, [setHasUnsavedChanges]);

  useEffect(() => {
    resetPageRef.current = resetPage;
  }, [resetPage]);

  // Handle browser refresh
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChangesRef.current && !isNavigatingRef.current) {
        e.preventDefault();
        e.returnValue = "";
        return e.returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Intercept link clicks
  useEffect(() => {
    const handleClick = async (e) => {
      if (isNavigatingRef.current) return;

      const link = e.target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      const target = link.getAttribute("target");

      if (target === "_blank") return;

      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("http://") ||
        href.startsWith("https://")
      ) {
        return;
      }

      if (!href.startsWith("/")) return;

      if (WORKFLOW_PATHS.some((path) => href.startsWith(path))) {
        return;
      }

      if (!hasUnsavedChangesRef.current) return;

      e.preventDefault();
      e.stopPropagation();

      const result = await Swal.fire({
        title: "لديك تغييرات غير محفوظة",
        text: "ماذا تريد أن تفعل؟",
        icon: "warning",
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonColor: "#d2a657",
        denyButtonColor: "#6c757d",
        cancelButtonColor: "#dc3545",
        confirmButtonText: "💾 حفظ والمتابعة",
        denyButtonText: "📝 متابعة بدون حفظ",
        cancelButtonText: "❌ البقاء هنا",
        allowOutsideClick: false,
        allowEscapeKey: false,
      });

      if (result.isConfirmed) {
        Swal.fire({
          title: "جاري الحفظ...",
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const saveSuccess = await onSaveRef.current();

        if (saveSuccess) {
          await Swal.fire({
            title: "تم الحفظ بنجاح!",
            icon: "success",
            timer: 1200,
            showConfirmButton: false,
            timerProgressBar: true,
          });

          isNavigatingRef.current = true;
          hasUnsavedChangesRef.current = false;
          if (setHasUnsavedChangesRef.current) {
            setHasUnsavedChangesRef.current(false);
          }
          router.push(href);
        }
      } else if (result.isDenied) {
        isNavigatingRef.current = true;
        hasUnsavedChangesRef.current = false;
        if (setHasUnsavedChangesRef.current) {
          setHasUnsavedChangesRef.current(false);
        }
        router.push(href);
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [router]);

  // Handle browser back button
  useEffect(() => {
    let isHandlingPopState = false;

    const handlePopState = async () => {
      if (isHandlingPopState || isNavigatingRef.current) return;

      if (!hasUnsavedChangesRef.current) return;

      isHandlingPopState = true;

      window.history.pushState(null, "", window.location.href);

      const result = await Swal.fire({
        title: "لديك تغييرات غير محفوظة",
        text: "ماذا تريد أن تفعل؟",
        icon: "warning",
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonColor: "#d2a657",
        denyButtonColor: "#6c757d",
        cancelButtonColor: "#dc3545",
        confirmButtonText: "💾 حفظ والعودة",
        denyButtonText: "📝 العودة بدون حفظ",
        cancelButtonText: "❌ البقاء هنا",
        allowOutsideClick: false,
        allowEscapeKey: false,
      });

      if (result.isConfirmed) {
        Swal.fire({
          title: "جاري الحفظ...",
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const saveSuccess = await onSaveRef.current();

        if (saveSuccess) {
          await Swal.fire({
            title: "تم الحفظ بنجاح!",
            icon: "success",
            timer: 1200,
            showConfirmButton: false,
            timerProgressBar: true,
          });

          isNavigatingRef.current = true;
          hasUnsavedChangesRef.current = false;
          if (setHasUnsavedChangesRef.current) {
            setHasUnsavedChangesRef.current(false);
          }
          router.back();
        }
      } else if (result.isDenied) {
        isNavigatingRef.current = true;
        hasUnsavedChangesRef.current = false;
        if (setHasUnsavedChangesRef.current) {
          setHasUnsavedChangesRef.current(false);
        }
        router.back();
      }

      isHandlingPopState = false;
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  // ✅ Reset on mount
  useEffect(() => {
    isNavigatingRef.current = false;
  }, []);

  return { isNavigating: isNavigatingRef.current };
}
