export function formatMoney(value, currency = "AED") {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return null;
  }

  const hasDecimals = !Number.isInteger(value);

  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency,
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(value);
}

export function getCurrentPrice(oldPrice, newPrice) {
  if (typeof newPrice === "number") return newPrice;
  if (typeof oldPrice === "number") return oldPrice;
  return null;
}

export function getStockUi(stockStatus) {
  switch (stockStatus) {
    case "in_stock":
      return {
        label: "In stock",
        pillClassName: "border-emerald-200 bg-emerald-50 text-emerald-700",
        dotClassName: "bg-emerald-500",
      };
    case "low_stock":
      return {
        label: "Low stock",
        pillClassName: "border-amber-200 bg-amber-50 text-amber-700",
        dotClassName: "bg-amber-500",
      };
    case "out_of_stock":
      return {
        label: "Out of stock",
        pillClassName: "border-red-200 bg-red-50 text-red-700",
        dotClassName: "bg-red-500",
      };
    default:
      return {
        label: "Check availability",
        pillClassName: "border-gray-200 bg-gray-50 text-gray-700",
        dotClassName: "bg-gray-400",
      };
  }
}

export function getMediaRoleLabel(item) {
  if (!item) return "";
  if (item.type === "video") return "Video";
  if (item.role === "front_image") return "Front";
  if (item.role === "back_image") return "Back";
  return "Image";
}
