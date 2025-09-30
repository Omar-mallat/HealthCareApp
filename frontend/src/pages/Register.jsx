import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import img1 from "../assets/contact_image.png";

const Register = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const possibleUrls = [
        "http://localhost:3000/api/doctors/register",
        "http://127.0.0.1:3000/api/doctors/register",
        "http://localhost:8000/api/doctors/register",
        "http://127.0.0.1:8000/api/doctors/register",
      ];

      let response = null;

      for (const url of possibleUrls) {
        try {
          response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
          break;
        } catch (err) {
          continue;
        }
      }

      if (!response) {
        toast.error("Server not found");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Registration failed");
        return;
      }

      toast.success("Registration successful");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <form
        onSubmit={onSubmitHandler}
        className="flex items-center justify-center w-full lg:w-1/2 px-6 py-12"
      >
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c0-1.105.895-2 2-2s2 .895 2 2m-2 2v1m4 4v-1a2 2 0 00-2-2H8a2 2 0 00-2 2v1m10 0h-4m-4 0H6"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
              Doctor Registration
            </h1>
          </div>

          {/* Registration Card */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20 space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full mt-1 px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="w-full mt-1 px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {loading ? "Registering..." : "Register"}
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-blue-600 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </form>

      {/* Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-800/30 z-10"></div>
        <img
          className="w-full h-full object-cover"
          src={img1}
          alt="Doctor registration"
        />
        <div className="absolute bottom-8 left-8 right-8 z-20 text-white">
          <h3 className="text-3xl font-bold mb-4">Join Labes Solutions</h3>
          <p className="text-lg opacity-90">
            Connect with patients and streamline your practice with powerful
            tools.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
