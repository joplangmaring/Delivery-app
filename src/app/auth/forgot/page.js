// pages/forgot-password.js

"use client"
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/forgot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset email sent. Check your inbox.");
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <p className="mb-6 text-gray-600">Enter your email to receive a reset link.</p>
      
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border border-gray-300 rounded mb-4 w-full max-w-sm focus:outline-none focus:border-blue-500"
      />
      
      <button
        onClick={handleForgotPassword}
        className={`px-4 py-2 text-white rounded w-full max-w-sm ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>
      
      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </div>
  );
}
