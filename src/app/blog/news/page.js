import { Suspense } from "react";
import NewsPageClient from "../../../components/Blog/NewsPageClient";

export const metadata = {
  title: "Latest News | RDS Pharma",
  description:
    "Explore the latest skincare, wellness, and pharmacy news from RDS Pharma.",
};

export default function NewsPage() {
  return (
    <Suspense fallback={null}>
      <NewsPageClient />
    </Suspense>
  );
}
