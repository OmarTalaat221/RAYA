// app/(protected)/profile/orders/page.jsx

import OrdersList from "../../../../components/Profile/OrdersList";

export const metadata = {
  title: "My Orders | RDS Pharma",
};

export default function OrdersPage() {
  return <OrdersList />;
}
