"use client";

import { useMemo, useState } from "react";
import { ConfigProvider, Drawer } from "antd";
import { SlidersHorizontal, X } from "lucide-react";

import AvailabilityFilter from "./AvailabilityFilter";
import PriceFilter from "./PriceFilter";

export default function MobileFiltersDrawer({
  availability,
  priceRange,
  priceStats,
  availabilityCounts,
  onToggleAvailability,
  onResetAvailability,
  onUpdatePrice,
  onResetPrice,
  currency = "AED",
}) {
  const [open, setOpen] = useState(false);

  const hasPrice = priceRange.from !== "" || priceRange.to !== "";
  const activeCount = useMemo(() => {
    let count = 0;
    if (availability.length > 0) count += availability.length;
    if (hasPrice) count += 1;
    return count;
  }, [availability.length, hasPrice]);

  const hasActiveFilters = activeCount > 0;

  const handleResetAll = () => {
    onResetAvailability();
    onResetPrice();
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#68bc52",
          borderRadius: 16,
          fontFamily: "Poppins, sans-serif",
          colorBgElevated: "#ffffff",
          colorText: "#2d2d2d",
          boxShadowSecondary: "0 18px 40px rgba(15, 23, 42, 0.12)",
        },
      }}
    >
      <>
        <style>{`
          .catalog-filters-drawer .ant-drawer-content {
            overflow: hidden;
          }

          .catalog-filters-drawer .ant-drawer-header-title {
            align-items: center;
          }

          @media (min-width: 640px) {
            .catalog-filters-drawer .ant-drawer-content {
              border-top-left-radius: 24px;
              border-bottom-left-radius: 24px;
            }
          }
        `}</style>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-all duration-300 font-poppins! ${
            hasActiveFilters
              ? "border-main/30 bg-main/5 text-main"
              : "border-soft-black/15 bg-white text-soft-black hover:border-main hover:text-main"
          }`}
        >
          <SlidersHorizontal size={16} />
          <span>Filters</span>

          {activeCount > 0 && (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-main px-1.5 text-[11px] font-semibold text-white">
              {activeCount}
            </span>
          )}
        </button>

        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          placement="right"
          size="min(100vw, 420px)"
          destroyOnClose
          maskClosable
          rootClassName="catalog-filters-drawer"
          closeIcon={<X size={18} />}
          title={
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-soft-black font-poppins!">
              Filter Products
            </span>
          }
          styles={{
            header: {
              padding: "18px 20px",
              borderBottom: "1px solid rgba(0,0,0,0.06)",
            },
            body: {
              padding: "20px",
            },
          }}
        >
          <div className="flex h-full flex-col">
            <div className="space-y-4">
              <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5">
                <AvailabilityFilter
                  availability={availability}
                  counts={availabilityCounts}
                  onToggle={onToggleAvailability}
                  onReset={onResetAvailability}
                  onClose={() => setOpen(false)}
                />
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5">
                <PriceFilter
                  priceRange={priceRange}
                  priceStats={priceStats}
                  onUpdate={onUpdatePrice}
                  onReset={onResetPrice}
                  onClose={() => setOpen(false)}
                  currency={currency}
                />
              </div>
            </div>

            <div className="mt-6 border-t border-gray-100 pt-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleResetAll}
                  disabled={!hasActiveFilters}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-soft-black/15 bg-white px-4 text-sm font-medium text-soft-black transition-all duration-300 disabled:pointer-events-none disabled:opacity-40 hover:border-main hover:text-main font-poppins!"
                >
                  Reset all
                </button>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-11 items-center justify-center rounded-full bg-main px-4 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(104,188,82,0.22)] transition-all duration-300 hover:bg-[#5fb14a] font-poppins!"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </Drawer>
      </>
    </ConfigProvider>
  );
}
