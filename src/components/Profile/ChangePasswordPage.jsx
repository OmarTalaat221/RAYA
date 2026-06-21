// components/Profile/ChangePasswordPage.jsx

"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ConfigProvider, Input } from "antd";
import { Mail, Check } from "lucide-react";
import {
    requestPasswordChangeThunk,
    verifyPasswordChangeThunk,
    resetPasswordFlow,
} from "../../store/profileSlice";
import ErrorBanner from "./ErrorBanner";

const antdTheme = {
    token: {
        colorPrimary: "#68bc52",
        borderRadius: 12,
        fontFamily: "Poppins, sans-serif",
        controlHeight: 48,
    },
};

export default function ChangePasswordPage() {
    const dispatch = useDispatch();

    const profile = useSelector((s) => s.profile.data);

    const requestLoading = useSelector((s) => s.profile.passwordRequestLoading);
    const requestError = useSelector((s) => s.profile.passwordRequestError);
    const requestSuccess = useSelector((s) => s.profile.passwordRequestSuccess);
    const otpSent = useSelector((s) => s.profile.passwordOtpSent);

    const verifyLoading = useSelector((s) => s.profile.passwordVerifyLoading);
    const verifyError = useSelector((s) => s.profile.passwordVerifyError);
    const verifySuccess = useSelector((s) => s.profile.passwordVerifySuccess);

    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [localError, setLocalError] = useState("");

    useEffect(() => {
        return () => {
            dispatch(resetPasswordFlow());
        };
    }, [dispatch]);

    useEffect(() => {
        if (verifySuccess) {
            setOtp("");
            setPassword("");
            setConfirmPassword("");
        }
    }, [verifySuccess]);

    const handleRequestOtp = async () => {
        if (requestLoading) return;
        setLocalError("");
        await dispatch(requestPasswordChangeThunk());
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setLocalError("");

        if (!otp.trim()) {
            setLocalError("Please enter the OTP sent to your email.");
            return;
        }
        if (password.length < 8) {
            setLocalError("Password must be at least 8 characters.");
            return;
        }
        if (password !== confirmPassword) {
            setLocalError("Passwords do not match.");
            return;
        }

        await dispatch(
            verifyPasswordChangeThunk({ otp, password, confirmPassword })
        );
    };

    return (
        <ConfigProvider theme={antdTheme}>
            <section className="rounded-3xl border border-black/5 bg-white p-5 sm:p-8 lg:h-full lg:overflow-y-auto scrollbar-hide">
                <div className="mb-6">
                    <h2 className="font-oswald! text-2xl font-semibold uppercase tracking-wide text-soft-black sm:text-3xl">
                        Change Password
                    </h2>
                    <p className="font-poppins! mt-1 text-sm text-secondary">
                        We'll send a one-time code to your email
                    </p>
                </div>

                {verifySuccess && (
                    <div className="mb-5 flex items-center gap-2 rounded-2xl border border-main/20 bg-main/5 px-4 py-3">
                        <Check size={16} className="shrink-0 text-main" strokeWidth={2.5} />
                        <p className="font-poppins! text-[13px] font-medium text-main">
                            {verifySuccess}
                        </p>
                    </div>
                )}

                {requestSuccess && !verifySuccess && (
                    <div className="mb-5 flex items-center gap-2 rounded-2xl border border-main/20 bg-main/5 px-4 py-3">
                        <Check size={16} className="shrink-0 text-main" strokeWidth={2.5} />
                        <p className="font-poppins! text-[13px] font-medium text-main">
                            {requestSuccess}
                        </p>
                    </div>
                )}

                <ErrorBanner error={localError || requestError || verifyError} />

                {!otpSent ? (
                    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 sm:p-6">
                        <div className="mb-4 flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-main/10 text-main">
                                <Mail size={18} strokeWidth={1.8} />
                            </div>
                            <div>
                                <h3 className="font-poppins! text-[14px] font-semibold text-soft-black">
                                    Verify your email
                                </h3>
                                <p className="font-poppins! mt-1 text-[13px] leading-6 text-secondary">
                                    We'll send a 6-digit code to{" "}
                                    <span className="font-medium text-soft-black">
                                        {profile?.email || "your email"}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleRequestOtp}
                            disabled={requestLoading}
                            className="font-poppins! inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-main px-6 text-[13px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_10px_24px_rgba(104,188,82,0.22)] transition hover:bg-[#5fb14a] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                        >
                            {requestLoading ? "Sending..." : "Send OTP"}
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleVerify} className="space-y-5">
                        <div>
                            <label className="font-poppins! mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-secondary">
                                OTP Code
                            </label>
                            <Input
                                size="large"
                                value={otp}
                                onChange={(e) =>
                                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                                }
                                placeholder="000000"
                                maxLength={6}
                                className="!font-poppins !rounded-xl !text-center !text-[18px] !font-semibold !tracking-[0.3em]"
                            />
                            <button
                                type="button"
                                onClick={handleRequestOtp}
                                disabled={requestLoading}
                                className="font-poppins! mt-2 text-[12px] font-medium text-main underline underline-offset-2 hover:text-main/80 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {requestLoading ? "Resending..." : "Resend code"}
                            </button>
                        </div>

                        <div>
                            <label className="font-poppins! mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-secondary">
                                New Password
                            </label>
                            <Input.Password
                                size="large"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="At least 8 characters"
                                className="!font-poppins !rounded-xl"
                            />
                        </div>

                        <div>
                            <label className="font-poppins! mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-secondary">
                                Confirm Password
                            </label>
                            <Input.Password
                                size="large"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Re-enter password"
                                className="!font-poppins !rounded-xl"
                            />
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                disabled={verifyLoading}
                                className="font-poppins! inline-flex h-12 items-center justify-center gap-2 rounded-full bg-main px-8 text-[13px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_10px_24px_rgba(104,188,82,0.22)] transition hover:bg-[#5fb14a] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {verifyLoading ? "Updating..." : "Update Password"}
                            </button>
                        </div>
                    </form>
                )}
            </section>
        </ConfigProvider>
    );
}