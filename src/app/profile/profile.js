"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function UserInfo() {
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = useState(false); // State to manage visibility

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev); // Toggle the visibility
  };

  return (
    <div className="relative">
      {/* Profile Image */}
      <div
        className="cursor-pointer flex items-center"
        onClick={toggleVisibility}
      >
        {session?.user?.image ? (
          <Image
            src={session.user.image}
            alt="User Profile"
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        ) : (
          <Image
            src="/fallback-image.jpg"
            alt="Fallback Profile"
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        )}
      </div>

      {/* Dropdown Content */}
      {isVisible && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-64 z-50">
          <div className="p-4 flex flex-col gap-2">
            <div>
              Name: <span className="font-bold">{session?.user?.name || "Unknown"}</span>
            </div>
            <div>
              {session?.user?.email === "amaringjoplang@gmail.com" && (
                <h1 className="text-green-500 font-bold">You have completed the task</h1>
              )}
            </div>
            <div>
              Email: <span className="font-bold">{session?.user?.email || "No Email"}</span>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
              className="bg-red-500 text-white font-bold px-6 py-2 mt-3 rounded-md hover:bg-red-600"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
