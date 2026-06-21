// app/(protected)/profile/orders/[id]/page.jsx

import OrderDetailsPage from "../../../../../components/Profile/OrderDetailsPage";

export const metadata = {
  title: "Order Details | RDS Pharma",
};

export default async function Page({ params }) {
  const { id } = await params;
  return <OrderDetailsPage orderId={id} />;
}
