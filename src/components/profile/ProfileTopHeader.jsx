"use client";
import { useSelector } from 'react-redux';

export default function ProfileTopHeader() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="text-right">
      <h1 className="text-2xl py-[50px] pt-[100px] md:text-4xl font-extrabold text-[#c79d4b]">
        مرحبًا بك يا {user?.full_name || 'كنان'}
      </h1>
    </div>
  );
}
