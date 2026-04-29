import AuthGuard from "../../components/Auth/AuthGuard";

export default function AuthLayout({ children }) {
  return <AuthGuard mode="guest">{children}</AuthGuard>;
}
