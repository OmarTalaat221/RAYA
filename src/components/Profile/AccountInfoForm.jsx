// components/Profile/AccountInfoForm.jsx

"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ConfigProvider, Select, Input } from "antd";
import PhoneInput from "react-phone-input-2";
import { Check, ChevronDown } from "lucide-react";
import {
    updateProfileThunk,
    clearUpdateStatus,
} from "../../store/profileSlice";
import ErrorBanner from "./ErrorBanner";
import "react-phone-input-2/lib/style.css";

const GENDERS = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
];

const COUNTRIES = [
    { label: "Egypt", value: "Egypt" },
    { label: "Saudi Arabia", value: "Saudi Arabia" },
    { label: "United Arab Emirates", value: "United Arab Emirates" },
    { label: "Kuwait", value: "Kuwait" },
    { label: "Qatar", value: "Qatar" },
];

const EMPTY_FORM = {
    name: "",
    phone: "",
    codeCountry: "",
    gender: "",
    country: "",
};

const antdTheme = {
    token: {
        colorPrimary: "#68bc52",
        borderRadius: 12,
        fontFamily: "Poppins, sans-serif",
        controlHeight: 48,
        colorBorder: "#e5e7eb",
        colorText: "#2d2d2d",
    },
};

export default function AccountInfoForm() {
    const dispatch = useDispatch();

    const profile = useSelector((s) => s.profile.data);
    const updating = useSelector((s) => s.profile.updating);
    const updateError = useSelector((s) => s.profile.updateError);
    const updateSuccess = useSelector((s) => s.profile.updateSuccess);

    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!profile) return;
        setForm({
            name: profile.name || "",
            phone: profile.phone || "",
            codeCountry: profile.codeCountry || "",
            gender: profile.gender || "",
            country: profile.country || "",
        });
    }, [profile]);

    useEffect(() => {
        if (!updateSuccess) return;
        const timer = setTimeout(() => {
            dispatch(clearUpdateStatus());
        }, 4000);
        return () => clearTimeout(timer);
    }, [updateSuccess, dispatch]);

    const handleField = (field) => (value) => {
        /* value can be a string (Select) or event (Input) */
        const next = typeof value === "object" && value?.target ? value.target.value : value;
        setForm((prev) => ({ ...prev, [field]: next }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    const handlePhoneChange = (value, data) => {
        const dialCode = data?.dialCode || "";
        const codeCountry = dialCode ? `+${dialCode}` : "";
        const phoneOnly = value.replace(dialCode, "");

        setForm((prev) => ({
            ...prev,
            phone: phoneOnly,
            codeCountry,
        }));

        if (errors.phone) {
            setErrors((prev) => ({ ...prev, phone: "" }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = "Name is required";
        if (!form.phone.trim()) newErrors.phone = "Phone is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (updating) return;
        if (!validate()) return;
        dispatch(updateProfileThunk(form));
    };

    const phoneFullValue = `${(form.codeCountry || "").replace(
        /[^\d]/g,
        ""
    )}${form.phone || ""}`;

    if (!profile) {
        return (
            <div className="h-[520px] animate-pulse rounded-3xl bg-white/70" />
        );
    }

    return (
        <ConfigProvider theme={antdTheme}>
            <section className="rounded-3xl border border-black/5 bg-white p-5 sm:p-8 lg:h-full lg:overflow-y-auto scrollbar-hide">
                <div className="mb-6">
                    <h2 className="font-oswald! text-2xl font-semibold uppercase tracking-wide text-soft-black sm:text-3xl">
                        Account Information
                    </h2>
                    <p className="font-poppins! mt-1 text-sm text-secondary">
                        Update your personal details
                    </p>
                </div>

                {updateSuccess && (
                    <div className="mb-5 flex items-center gap-2 rounded-2xl border border-main/20 bg-main/5 px-4 py-3">
                        <Check size={16} className="shrink-0 text-main" strokeWidth={2.5} />
                        <p className="font-poppins! text-[13px] font-medium text-main">
                            Profile updated successfully.
                        </p>
                    </div>
                )}

                <ErrorBanner error={updateError} />

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* ── Full Name ── */}
                    <div>
                        <label className="font-poppins! mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-secondary">
                            Full Name
                        </label>
                        <Input
                            size="large"
                            value={form.name}
                            onChange={handleField("name")}
                            placeholder="Your full name"
                            status={errors.name ? "error" : ""}
                            className="!font-poppins !rounded-xl"
                        />
                        {errors.name && (
                            <p className="font-poppins! mt-1.5 text-[12px] text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* ── Email (read-only) ── */}
                    <div>
                        <label className="font-poppins! mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-secondary">
                            Email
                        </label>
                        <Input
                            size="large"
                            value={profile.email || ""}
                            readOnly
                            disabled
                            className="!font-poppins !rounded-xl !bg-gray-50"
                        />
                    </div>

                    {/* ── Phone ── */}
                    <div>
                        <label className="font-poppins! mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-secondary">
                            Phone
                        </label>
                        <PhoneInput
                            country={"eg"}
                            value={phoneFullValue}
                            onChange={handlePhoneChange}
                            enableSearch
                            inputClass="!font-poppins !h-12 !w-full !rounded-xl !border !border-gray-200 !bg-white !text-[14px] !text-soft-black"
                            buttonClass="!h-12 !rounded-l-xl !border !border-gray-200 !bg-white"
                            containerClass="!w-full"
                            dropdownClass="!rounded-xl"
                        />
                        {errors.phone && (
                            <p className="font-poppins! mt-1.5 text-[12px] text-red-500">
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    {/* ── Gender + Country ── */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <label className="font-poppins! mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-secondary">
                                Gender
                            </label>
                            <Select
                                size="large"
                                value={form.gender || undefined}
                                onChange={handleField("gender")}
                                options={GENDERS}
                                placeholder="Select gender"
                                suffixIcon={<ChevronDown size={16} className="text-secondary" />}
                                className="!font-poppins !w-full"
                                popupClassName="!font-poppins"
                            />
                        </div>

                        <div>
                            <label className="font-poppins! mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-secondary">
                                Country
                            </label>
                            <Select
                                size="large"
                                value={form.country || undefined}
                                onChange={handleField("country")}
                                options={COUNTRIES}
                                placeholder="Select country"
                                showSearch
                                optionFilterProp="label"
                                suffixIcon={<ChevronDown size={16} className="text-secondary" />}
                                className="!font-poppins !w-full"
                                popupClassName="!font-poppins"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            disabled={updating}
                            className="font-poppins! inline-flex h-12 items-center justify-center gap-2 rounded-full bg-main px-8 text-[13px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_10px_24px_rgba(104,188,82,0.22)] transition-all duration-200 hover:bg-[#5fb14a] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {updating ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </section>
        </ConfigProvider>
    );
}