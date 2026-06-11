import CheckoutPage from "../../../components/Checkout/CheckoutPage";

export const metadata = {
  title: "Checkout | RDS Pharma",
  description: "Complete your RDS Pharma order securely.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Checkout() {
  return <CheckoutPage />;
}