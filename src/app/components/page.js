"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function UserInfo() {
  const { data: session } = useSession();

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6">
        <div>
          Name: <span className="font-bold">{session?.user?.name}</span>
        </div>
        <div>
          {/* Check if user's email matches the specified email */}
          {session?.user?.email === "amaringjoplang@gmail.com" && (
            <h1 className="text-green-500 font-bold">You have completed the task</h1>
          )}
        </div>
        <div>
          <img
            src={session?.user?.image || "https://www.example.com/fallback-image.jpg"}
            alt="User Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
