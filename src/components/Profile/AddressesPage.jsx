// components/Profile/AddressesPage.jsx

"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ConfigProvider, Popconfirm, Input } from "antd";
import { MapPin, Plus, Pencil, Trash2, Check, X } from "lucide-react";
import {
    addAddressThunk,
    updateAddressThunk,
    deleteAddressThunk,
    clearAddressStatus,
} from "../../store/profileSlice";
import ErrorBanner from "./ErrorBanner";

const { TextArea } = Input;
const MAX_ADDRESSES = 2;

const antdTheme = {
    token: {
        colorPrimary: "#68bc52",
        borderRadius: 14,
        fontFamily: "Poppins, sans-serif",
    },
};

export default function AddressesPage() {
    const dispatch = useDispatch();

    const profile = useSelector((s) => s.profile.data);
    const loading = useSelector((s) => s.profile.addressLoading);
    const error = useSelector((s) => s.profile.addressError);
    const success = useSelector((s) => s.profile.addressSuccess);

    const addresses = profile?.addresses || [];
    const canAdd = addresses.length < MAX_ADDRESSES;

    const [showAdd, setShowAdd] = useState(false);
    const [newValue, setNewValue] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editingValue, setEditingValue] = useState("");

    useEffect(() => {
        if (!success) return;
        const timer = setTimeout(() => {
            dispatch(clearAddressStatus());
        }, 3500);
        return () => clearTimeout(timer);
    }, [success, dispatch]);

    const handleAdd = async () => {
        const value = newValue.trim();
        if (!value || loading) return;
        const result = await dispatch(addAddressThunk(value));
        if (result.meta.requestStatus === "fulfilled") {
            setNewValue("");
            setShowAdd(false);
        }
    };

    const handleStartEdit = (address) => {
        setEditingId(address.id);
        setEditingValue(address.value);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditingValue("");
    };

    const handleSaveEdit = async () => {
        const value = editingValue.trim();
        if (!value || loading || !editingId) return;
        const result = await dispatch(
            updateAddressThunk({ id: editingId, value })
        );
        if (result.meta.requestStatus === "fulfilled") {
            handleCancelEdit();
        }
    };

    const handleDelete = async (id) => {
        if (loading) return;
        await dispatch(deleteAddressThunk(id));
    };

    if (!profile) {
        return <div className="h-[400px] animate-pulse rounded-3xl bg-white/70" />;
    }

    return (
        <ConfigProvider theme={antdTheme}>
            <section className="rounded-3xl border border-black/5 bg-white p-5 sm:p-8 lg:h-full lg:overflow-y-auto scrollbar-hide">
                <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <h2 className="font-oswald! text-2xl font-semibold uppercase tracking-wide text-soft-black sm:text-3xl">
                            My Addresses
                        </h2>
                        <p className="font-poppins! mt-1 text-sm text-secondary">
                            Save up to {MAX_ADDRESSES} addresses for faster checkout
                        </p>
                    </div>

                    {canAdd && !showAdd && (
                        <button
                            type="button"
                            onClick={() => setShowAdd(true)}
                            disabled={loading}
                            className="font-poppins! inline-flex h-11 items-center gap-2 rounded-full bg-main px-5 text-[13px] font-semibold uppercase tracking-wider text-white shadow-[0_10px_24px_rgba(104,188,82,0.22)] transition hover:bg-[#5fb14a] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Plus size={16} strokeWidth={2.2} />
                            Add Address
                        </button>
                    )}
                </div>

                {success && (
                    <div className="mb-4 flex items-center gap-2 rounded-2xl border border-main/20 bg-main/5 px-4 py-3">
                        <Check size={16} className="shrink-0 text-main" strokeWidth={2.5} />
                        <p className="font-poppins! text-[13px] font-medium text-main">
                            {success}
                        </p>
                    </div>
                )}

                <ErrorBanner error={error} />

                {showAdd && (
                    <div className="mb-5 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                        <label className="font-poppins! mb-2 block text-[12px] font-semibold uppercase tracking-wider text-secondary">
                            New Address
                        </label>
                        <TextArea
                            value={newValue}
                            onChange={(e) => setNewValue(e.target.value)}
                            rows={3}
                            placeholder="Street, building, apartment, city..."
                            disabled={loading}
                            className="!font-poppins !rounded-xl"
                        />
                        <div className="mt-3 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowAdd(false);
                                    setNewValue("");
                                }}
                                disabled={loading}
                                className="font-poppins! inline-flex h-10 items-center rounded-full border border-black/10 bg-white px-4 text-[12.5px] font-medium text-secondary transition hover:border-main/30 hover:text-main disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleAdd}
                                disabled={loading || !newValue.trim()}
                                className="font-poppins! inline-flex h-10 items-center gap-1.5 rounded-full bg-main px-5 text-[12.5px] font-semibold uppercase tracking-wider text-white shadow-[0_8px_18px_rgba(104,188,82,0.22)] transition hover:bg-[#5fb14a] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loading ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                )}

                {addresses.length === 0 && !showAdd ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black/5">
                            <MapPin size={28} strokeWidth={1.5} className="text-secondary" />
                        </div>
                        <h3 className="font-oswald! text-lg font-semibold text-soft-black">
                            No addresses yet
                        </h3>
                        <p className="font-poppins! mt-1 max-w-[36ch] text-sm text-secondary">
                            Add an address to make checkout faster.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {addresses.map((address, idx) => (
                            <div
                                key={address.id}
                                className="rounded-2xl border border-gray-100 bg-white p-4 transition hover:border-gray-200 sm:p-5"
                            >
                                {editingId === address.id ? (
                                    <div>
                                        <label className="font-poppins! mb-2 block text-[12px] font-semibold uppercase tracking-wider text-secondary">
                                            Edit Address
                                        </label>
                                        <TextArea
                                            value={editingValue}
                                            onChange={(e) => setEditingValue(e.target.value)}
                                            rows={3}
                                            disabled={loading}
                                            className="!font-poppins !rounded-xl"
                                        />
                                        <div className="mt-3 flex justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={handleCancelEdit}
                                                disabled={loading}
                                                className="font-poppins! inline-flex h-10 items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 text-[12.5px] font-medium text-secondary transition hover:border-main/30 hover:text-main disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <X size={14} />
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleSaveEdit}
                                                disabled={loading || !editingValue.trim()}
                                                className="font-poppins! inline-flex h-10 items-center gap-1.5 rounded-full bg-main px-5 text-[12.5px] font-semibold uppercase tracking-wider text-white shadow-[0_8px_18px_rgba(104,188,82,0.22)] transition hover:bg-[#5fb14a] disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <Check size={14} strokeWidth={2.5} />
                                                {loading ? "Saving..." : "Save"}
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex min-w-0 items-start gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-main/10 text-main">
                                                <MapPin size={18} strokeWidth={1.8} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-poppins! text-[11px] font-semibold uppercase tracking-wider text-secondary">
                                                    Address {idx + 1}
                                                </p>
                                                <p className="font-poppins! mt-1 break-words text-[14px] font-medium text-soft-black">
                                                    {address.value}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex shrink-0 items-center gap-1">
                                            <button
                                                type="button"
                                                onClick={() => handleStartEdit(address)}
                                                disabled={loading}
                                                aria-label="Edit address"
                                                className="flex h-9 w-9 items-center justify-center rounded-full text-secondary transition hover:bg-main/10 hover:text-main disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <Pencil size={15} strokeWidth={1.8} />
                                            </button>

                                            <Popconfirm
                                                title="Delete address"
                                                description="Are you sure you want to delete this address?"
                                                okText="Delete"
                                                cancelText="Cancel"
                                                okButtonProps={{ danger: true }}
                                                placement="topRight"
                                                onConfirm={() => handleDelete(address.id)}
                                                disabled={loading}
                                            >
                                                <button
                                                    type="button"
                                                    disabled={loading}
                                                    aria-label="Delete address"
                                                    className="flex h-9 w-9 items-center justify-center rounded-full text-secondary transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    <Trash2 size={15} strokeWidth={1.8} />
                                                </button>
                                            </Popconfirm>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {!canAdd && !showAdd && addresses.length > 0 && (
                    <p className="font-poppins! mt-4 text-center text-[12px] text-secondary">
                        You've reached the maximum of {MAX_ADDRESSES} addresses.
                    </p>
                )}
            </section>
        </ConfigProvider>
    );
}