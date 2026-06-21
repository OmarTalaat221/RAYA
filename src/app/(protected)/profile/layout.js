// app/(protected)/profile/layout.jsx

import ProfileLayout from "../../../components/Profile/ProfileLayout";

export const metadata = {
  title: "My Account | RDS Pharma",
  description: "Manage your profile and orders",
};

export default function ProfileSection({ children }) {
  return <ProfileLayout>{children}</ProfileLayout>;
}
