export function sortToApiParams(sort) {
  if (!sort || sort === "default") {
    return { sortBy: undefined, sortOrder: undefined };
  }

  const [field, order] = sort.split("-");

  const validFields = ["price", "title"];
  const validOrders = ["asc", "desc"];

  return {
    sortBy: validFields.includes(field) ? field : undefined,
    sortOrder: validOrders.includes(order) ? order : undefined,
  };
}
