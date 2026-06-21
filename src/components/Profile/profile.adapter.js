// components/Profile/profile.adapter.js

function clean(v) {
  return typeof v === "string" ? v.trim() : v;
}

function adaptAddress(raw) {
  if (!raw) return null;
  return {
    id: raw.id || "",
    value: clean(raw.name) || clean(raw.address) || clean(raw.adress) || "",
  };
}

export function adaptProfile(raw) {
  if (!raw) return null;

  const addresses = Array.isArray(raw.adresses) ? raw.adresses : [];

  return {
    id: raw.id || "",
    email: clean(raw.email) || "",
    name: clean(raw.name) || "",
    phone: clean(raw.phone) || "",
    codeCountry: clean(raw.code_country) || clean(raw.codeCountry) || "",
    gender: clean(raw.gender) || "",
    country: clean(raw.country) || "",
    provider: clean(raw.provider) || "local",
    confirmedAt: raw.confirmAt || null,
    createdAt: raw.createdAt || null,
    addresses: addresses.map(adaptAddress).filter(Boolean),
  };
}

export function buildProfileUpdatePayload(form) {
  return {
    name: clean(form.name) || "",
    phone: clean(form.phone) || "",
    codeCountry: clean(form.codeCountry) || "",
    gender: clean(form.gender) || "",
    country: clean(form.country) || "",
  };
}
