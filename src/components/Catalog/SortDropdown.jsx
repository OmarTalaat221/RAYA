"use client";

import { ConfigProvider, Select } from "antd";
import { ArrowUpDown } from "lucide-react";

const sortOptions = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "title-asc", label: "Alphabetically: A–Z" },
  { value: "title-desc", label: "Alphabetically: Z–A" },
];

export default function SortDropdown({ value, onChange, fullWidth = false }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#68bc52",
          borderRadius: 12,
          fontFamily: "Poppins, sans-serif",
          colorBgElevated: "#ffffff",
          colorText: "#2d2d2d",
          boxShadowSecondary: "0 18px 40px rgba(15, 23, 42, 0.12)",
        },
        components: {
          Select: {
            optionSelectedBg: "rgba(104, 188, 82, 0.10)",
            optionActiveBg: "rgba(104, 188, 82, 0.06)",
            optionSelectedColor: "#2d2d2d",
          },
        },
      }}
    >
      <div className={`flex items-center gap-2 ${fullWidth ? "w-full" : ""}`}>
        <ArrowUpDown size={14} className="shrink-0 text-secondary" />

        <Select
          value={value}
          onChange={onChange}
          options={sortOptions}
          showSearch={false}
          className="catalog-sort-select"
          popupClassName="catalog-sort-dropdown"
          getPopupContainer={(trigger) => trigger.parentElement}
          style={{ width: fullWidth ? "100%" : 220 }}
        />
      </div>
    </ConfigProvider>
  );
}
