// app/(protected)/layout.jsx
import AuthGuard from "../../components/Auth/AuthGuard";

export const metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-snippet": 0,
    },
  },
};
export default function ProtectedLayout({ children }) {
  return <AuthGuard mode="protected">{children}</AuthGuard>;
}
