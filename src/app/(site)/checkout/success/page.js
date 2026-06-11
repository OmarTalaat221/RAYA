import CheckoutSuccess from "../../../../components/Checkout/CheckoutSuccess";

export const metadata = {
  title: "Order Successful | RDS Pharma",
  description: "Your RDS Pharma order has been placed successfully.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutSuccessPage() {
  return <CheckoutSuccess />;
}