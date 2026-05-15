export function availabilityToApiParam(availability = []) {
  if (!Array.isArray(availability) || availability.length !== 1) {
    return undefined;
  }

  const value = availability[0];
  if (value === "in_stock") return true;
  if (value === "out_of_stock") return false;

  return undefined;
}

export function priceRangeToApiParam(priceRange = {}, maxFallback) {
  const fromRaw = priceRange?.from;
  const toRaw = priceRange?.to;

  const hasFrom = fromRaw !== "" && fromRaw !== null && fromRaw !== undefined;
  const hasTo = toRaw !== "" && toRaw !== null && toRaw !== undefined;

  if (!hasFrom && !hasTo) return undefined;

  const min = hasFrom ? Number(fromRaw) : 0;
  const max = hasTo ? Number(toRaw) : Number(maxFallback) || 999999;

  if (!Number.isFinite(min) || !Number.isFinite(max)) return undefined;

  return `${min}-${max}`;
}
