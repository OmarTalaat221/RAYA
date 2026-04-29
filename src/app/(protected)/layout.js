// app/(protected)/layout.jsx
import AuthGuard from "../../components/Auth/AuthGuard";

export default function ProtectedLayout({ children }) {
  return <AuthGuard mode="protected">{children}</AuthGuard>;
}
