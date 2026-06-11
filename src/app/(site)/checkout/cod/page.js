import CheckoutCODPage from "../../../../components/Checkout/CheckoutCODPage";

export const metadata = {
  title: "Cash on Delivery Checkout | RDS Pharma",
  description: "Complete your RDS Pharma order securely with Cash on Delivery.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutCOD() {
  return <CheckoutCODPage />;
}