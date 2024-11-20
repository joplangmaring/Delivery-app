"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res.error) {
                setError("Invalid Credentials");
                return;
            }

            router.replace("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="grid place-items-center h-screen bg-gray-100">
            <div className=" bg-white">
                {/* Social Login Buttons */}
                <button
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                    className="bg-orange-600 text-white font-bold px-4 py-2 rounded-lg mb-3 hover:bg-orange-700"
                >
                    Sign in with Google
                </button>
                <button
                    onClick={() => signIn("github", { callbackUrl: "/" })}
                    className="bg-orange-500 text-white font-bold px-4 py-2 rounded-lg mb-4 hover:bg-orange-700"
                >
                    Sign in with GitHub
                </button>

                {/* Form Title */}
                <h1 className="text-xl font-bold my-4 text-gray-800">Login</h1>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="Email"
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
                    />
                    <button className="bg-orange-600 text-white font-bold cursor-pointer px-6 py-2 rounded-lg mt-3 hover:bg-orange-700">
                        Login
                    </button>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )}

                    {/* Links */}
                    <Link
                        className="text-sm mt-3 text-center text-gray-600 hover:text-orange-600"
                        href={"/auth/register"}
                    >
                        Don't have an account? <span className="underline">Register</span>
                    </Link>
                    <Link
                        className="text-sm text-center mt-2 text-gray-600 hover:text-orange-600"
                        href={"/auth/forgot"}
                    >
                        <span className="underline">Forgot Password?</span>
                    </Link>
                </form>
            </div>
        </div>
    );
}
