"use client";

import React from "react";
import { CiSearch } from "react-icons/ci";
import Profile from "../profile/profile";
import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";

const Header = () => {
    const { data: session } = useSession();

    return (
        <header className="bg-white shadow-md p-4  top-0 left-0 w-full z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold text-orange-600">
                    <h1>Food Delivery</h1>
                </div>

                {/* Search Bar */}
                {/* <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 w-1/3">
          <input
            type="text"
            placeholder="Search food, restaurants..."
            className="flex-grow bg-transparent outline-none text-gray-600"
          />
          <CiSearch className="text-gray-600 text-xl" />
        </div> */}

                <div className="flex gap-2 text-orange-500 text-1xl font-bold">
                    <Link href="/menu">
                        <h1>Menu</h1>
                    </Link>
                    <Link href="/about">
                        <h1>About</h1>
                    </Link>
                    <Link href="/career">
                        <h1>Career</h1>
                    </Link>
                    <Link href="/contact">
                        <h1>Contact</h1>
                    </Link>
                </div>

                {/* Profile and Buttons */}
                <div className="flex items-center gap-4">
                    {!session ? (
                        <button
                            onClick={() => signIn()}
                            className="px-6 py-2 text-sm font-medium text-white bg-orange-500 rounded-full hover:bg-orange-600"
                        >
                            Login
                        </button>
                    ) : (
                        <>
                            <Profile className="rounded-full" />
                            <button
                                onClick={() => signOut({ callbackUrl: '/auth/login' })}
                                className="px-6 py-2 text-sm font-medium text-orange-500 border border-orange-500 rounded-full hover:bg-orange-600 hover:text-white"
                            >
                                Cart
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
