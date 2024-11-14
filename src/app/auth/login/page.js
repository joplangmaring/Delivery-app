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

      router.replace("/components");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400 bg-white">

      <button onClick={() => signIn("google", { callbackUrl: "/components" })} className="bg-blue-600 text-white font-bold px-4 py-2 rounded-lg mb-3">
  Sign in with Google
</button>
<button onClick={() => signIn("github", { callbackUrl: "/components" })} className="bg-gray-800 text-white font-bold px-4 py-2 rounded-lg mb-4">
  Sign in with GitHub
</button>

        
        <h1 className="text-xl font-bold my-4 text-gray-800">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500"
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2 rounded-lg mt-3">
            Login
          </button>
          
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-center text-gray-600 hover:text-green-600" href={"/register"}>
            Don't have an account? <span className="underline">Register</span>
          </Link>

          {/* Forgot Password Link with Same Styling */}
          <Link className="text-sm text-center mt-2 text-gray-600 hover:text-green-600" href={"/auth/forgot"}>
            <span className="underline">Forgot Password?</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
