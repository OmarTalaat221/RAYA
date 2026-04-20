"use client";

import { useEffect, useState } from "react";

function getTimeLeft(endsAt) {
  const end = new Date(endsAt).getTime();
  if (Number.isNaN(end)) return null;

  const diff = end - Date.now();
  if (diff <= 0) return null;

  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

function Unit({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#ef4444]/10 bg-white px-3 py-3 text-center">
      <div className="text-lg font-semibold text-soft-black sm:text-xl">
        {String(value).padStart(2, "0")}
      </div>
      <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary">
        {label}
      </div>
    </div>
  );
}

export default function ProductCountdown({ endsAt }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(endsAt));

  useEffect(() => {
    const initial = getTimeLeft(endsAt);
    setTimeLeft(initial);
    if (!initial) return;

    const id = window.setInterval(() => {
      setTimeLeft(getTimeLeft(endsAt));
    }, 1000);

    return () => window.clearInterval(id);
  }, [endsAt]);

  if (!timeLeft) return null;

  return (
    <section className="rounded-3xl border border-[#ef4444]/10 bg-[#fff8f8] p-4 sm:p-5">
      <div className="mb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ef4444]">
          Limited offer
        </p>
        <p className="mt-1 text-sm text-secondary">
          This promotional price ends soon.
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        <Unit label="Days" value={timeLeft.days} />
        <Unit label="Hours" value={timeLeft.hours} />
        <Unit label="Min" value={timeLeft.minutes} />
        <Unit label="Sec" value={timeLeft.seconds} />
      </div>
    </section>
  );
}
