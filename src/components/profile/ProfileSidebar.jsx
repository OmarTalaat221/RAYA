"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import Swal from "sweetalert2";

const menuItems = [
  { label: "الرئيسية", href: "/profile" },
  { label: "الملف الشخصي", href: "/profile/personal-info" },
  { label: "مواصفات الشريك", href: "/profile/partner-info" },
  { label: "معلومات الحساب", href: "/profile/account-info" },
  { label: "قائمة الطلبات", href: "/profile/orders" },
  { label: "الاشعارات", href: "/profile/notifications" },
  { label: "سجل المدفوعات", href: "/profile/payments" },
  { label: "طريقة الدفع للاشتراك", href: "/profile/payment-method" },
  { label: "تغيير كلمة المرور", href: "/profile/change-password" },
  { label: "التذاكر", href: "/profile/tickets" },
];

export default function ProfileSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "تسجيل الخروج",
      text: "هل أنت متأكد أنك تريد تسجيل الخروج؟",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#DCB56D",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم، خروج",
      cancelButtonText: "إلغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        router.push("/login");
      }
    });
  };

  return (
    <aside className="bg-[#fff] border border-[#eadcc3] rounded-2xl p-5 lg:sticky lg:top-24">
      <nav className="flex flex-col gap-3 text-right">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[15px] transition font-bold ${
                isActive
                  ? "!text-[#c79d4b]"
                  : "!text-[#6e6a64] hover:text-[#c79d4b]!"
              }`}
            >
              {item.label}
            </Link>
          );
        })}

        <button
          onClick={handleLogout}
          className=" text-[15px] font-bold text-[#FF0000]! hover:opacity-80 transition text-right bg-transparent border-none p-0 cursor-pointer"
        >
          تسجيل خروج
        </button>
      </nav>
    </aside>
  );
}
