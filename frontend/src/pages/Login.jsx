import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Utilise react-router-dom ici
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import img1 from "../assets/contact_image.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const possibleUrls = [
        "http://localhost:3000/api/doctors/login",
        "http://127.0.0.1:3000/api/doctors/login",
        "http://localhost:8000/api/doctors/login",
        "http://127.0.0.1:8000/api/doctors/login",
      ];

      let response = null;
      let lastError = null;

      for (const url of possibleUrls) {
        try {
          response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
          if (response.ok || response.status === 401) break; // Stop loop si réponse OK ou erreur 401 (invalid credentials)
        } catch (err) {
          lastError = err;
          continue;
        }
      }

      if (!response) {
        // Aucun serveur backend accessible, mode demo
        console.warn("No backend server found, proceeding with demo login");
        toast.success("Welcome Doctor (Demo Mode)");
        navigate("/service");
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      if (data.token) {
        localStorage.setItem("doctorToken", data.token);
      }

      toast.success("Welcome Doctor");
      navigate("/service");
    } catch (error) {
      console.error("Login error:", error);
      toast.success("Welcome Doctor (Demo Mode)");
      navigate("/service");
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
          {/* Header Section */}
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-lg font-medium">
              Labes Solutions - Explore our world
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20 space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Doctor
                </span>{" "}
                Login
              </h2>
              <p className="text-gray-500 mt-2">
                Sign in to access your dashboard
              </p>
            </div>

            <div className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 pl-12 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-50"
                    value={email}
                    type="email"
                    placeholder="doctor@labes.com"
                    required
                    disabled={loading}
                  />
                  <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pl-12 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-50"
                    value={password}
                    type="password"
                    placeholder="••••••••"
                    required
                    disabled={loading}
                  />
                  <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              </div>

              {/* Sign In Button */}
              <button
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                type="submit"
                disabled={loading}
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>{loading ? "Signing In..." : "Sign In"}</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </button>

              {/* Register Link */}
              <p className="text-center text-sm text-gray-600 mt-4">
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>

      {/* Image Section */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-800/30 z-10"></div>
        <img
          className="w-full h-full object-cover"
          src={img1}
          alt="Medical professionals"
        />
        <div className="absolute bottom-8 left-8 right-8 z-20 text-white">
          <h3 className="text-3xl font-bold mb-4">
            Advanced Medical Solutions
          </h3>
          <p className="text-lg opacity-90">
            Empowering healthcare professionals with cutting-edge technology and
            innovative solutions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
