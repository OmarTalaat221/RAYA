// utils/serverHeaders.js

import { headers } from "next/headers";

/* ─── helpers ─────────────────────────────────────────────────────────────── */

function isValidPublicIp(ip) {
  if (!ip) return false;
  const trimmed = String(ip).trim();
  if (!trimmed) return false;

  // Reject localhost & private ranges (won't help with geo)
  if (trimmed === "127.0.0.1" || trimmed === "::1") return false;
  if (trimmed.startsWith("10.")) return false;
  if (trimmed.startsWith("192.168.")) return false;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(trimmed)) return false;
  if (trimmed.startsWith("169.254.")) return false; // link-local
  if (trimmed.startsWith("fc") || trimmed.startsWith("fd")) return false; // IPv6 ULA

  return true;
}

/**
 * Picks the first valid public IP from a comma-separated chain.
 * Example: "REAL_IP, PROXY_1, PROXY_2" → "REAL_IP"
 */
function pickFirstPublicIp(chain) {
  if (!chain) return "";
  const parts = String(chain)
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);

  for (const ip of parts) {
    if (isValidPublicIp(ip)) return ip;
  }
  return "";
}

/* ─── main ────────────────────────────────────────────────────────────────── */

/**
 * Extracts the real client IP from request headers (server-side only).
 * Returns headers ready to be forwarded to the backend.
 */
export async function getClientGeoHeaders({ debug = false } = {}) {
  try {
    const h = await headers();

    // Collect all possible sources
    const sources = {
      "cf-connecting-ip": h.get("cf-connecting-ip") || "",
      "true-client-ip": h.get("true-client-ip") || "",
      "x-vercel-forwarded-for": h.get("x-vercel-forwarded-for") || "",
      "x-forwarded-for": h.get("x-forwarded-for") || "",
      "x-real-ip": h.get("x-real-ip") || "",
      "fastly-client-ip": h.get("fastly-client-ip") || "",
      "x-cluster-client-ip": h.get("x-cluster-client-ip") || "",
    };

    // Priority order: most-trusted single-IP headers first,
    // then chained headers (pick first public IP from the chain)
    const candidates = [
      sources["cf-connecting-ip"],
      sources["true-client-ip"],
      sources["fastly-client-ip"],
      pickFirstPublicIp(sources["x-vercel-forwarded-for"]),
      pickFirstPublicIp(sources["x-forwarded-for"]),
      sources["x-real-ip"],
      sources["x-cluster-client-ip"],
    ];

    const clientIp = candidates.find((ip) => isValidPublicIp(ip)) || "";

    if (debug) {
      console.log("════════ [GEO DEBUG] ════════");
      console.log("Raw headers:", JSON.stringify(sources, null, 2));
      console.log("Picked IP:", clientIp || "(none)");
      console.log("══════════════════════════════");
    }

    if (!clientIp) return {};

    return {
      "x-forwarded-for": clientIp,
      "x-real-ip": clientIp,
      "x-client-ip": clientIp,
      "true-client-ip": clientIp,
    };
  } catch (err) {
    if (debug) console.error("[GEO DEBUG] Error:", err);
    return {};
  }
}
