import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { passwordPattern } from "../components/patterns";
const API_URL = import.meta.env.VITE_BACKEND_URL;

const sendmail = async (email) => {
  const res = await fetch(`${API_URL}/sendmail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: email,
      subject: "Password Updated",
      text: `
  <div style="font-family: Arial, sans-serif; color: #333; text-align: center;">
    <img src="https://raw.githubusercontent.com/JeetNathwani26/image/refs/heads/main/logo.png" alt="KhetMitra" width="200" style="margin-bottom: 20px;" />
    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
      🔑 <strong>Your password has been updated successfully.</strong>
    </p>
    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
      If you did not request this change, please reset your password immediately or contact support to secure your account.
    </p>
    <p style="font-size: 14px; color: #666;">
      🌿 Best regards,<br/>
      <strong>The KhetMitra Team</strong>
    </p>
  </div>`,
    }),
  });

  if (!res.ok) throw new Error("Failed to send mail");
  return res.json();
};

const bloks = async (item, password) => {
  const res = await fetch(`${API_URL}/password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: item.email, password }),
  });

  if (!res.ok) throw new Error("Failed to update password");

  await res.json();
  await sendmail(item.email); // wait until email is sent
};

const Update = ({ email }) => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password.trim()) {
      toast.error("Password cannot be empty");
      return;
    }
    if(!passwordPattern.test(password)){
      toast.error("Please enter vaild password");
      return;
    }

    // ✅ Use toast.promise for async flow
    await toast.promise(
      bloks({ email }, password),
      {
        loading: "Updating password...",
        success: "Password updated & email sent ✅",
        error: "Failed to update password. Try again.",
      }
    );

    navigate("/login"); // ✅ Navigate only after toast success
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3"
      >
        <input
          type="password"
          placeholder="password must be have 8 digit"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="flex-1 pl-3 p-2 rounded bg-gray-50/70 shadow-inner focus:outline-none"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600 w-full sm:w-auto"
        >
          Confirm
        </button>
      </form>
    </div>
  );
};

export default Update;
