"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);

  // Using useEffect to get query parameters once they are available
  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (token && email) {
      setToken(token);
      setEmail(email);
    }
  }, [searchParams]);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, email, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password has been reset successfully.");
        router.push("/auth/login"); // Redirect to login page
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
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <p className="mb-6 text-gray-600">Enter your new password below.</p>
      
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="p-2 border border-gray-300 rounded mb-4 w-full max-w-sm focus:outline-none focus:border-blue-500"
      />

      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="p-2 border border-gray-300 rounded mb-4 w-full max-w-sm focus:outline-none focus:border-blue-500"
      />

      <button
        onClick={handleResetPassword}
        className={`px-4 py-2 text-white rounded w-full max-w-sm ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={loading}
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>

      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </div>
  );
}
