import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaApple, FaSignOutAlt } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin, setLogout } from '../../redux/userSlice'; // adjust path if needed
import { useNavigate } from "react-router-dom";
// ...

// ...
const Login = ({ setIsLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/user/login',
        { email, password },
        { withCredentials: true }
      );
      if (response.status === 200 && response.data.user) {
        toast.success('Login successful!');
        dispatch(setLogin({
          user: response.data.user,
          token: response.data.token,
        }));
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Login failed. Please check your credentials.'
      );
    }
    setEmail('');
    setPassword('');
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3000/user/logout', {}, { withCredentials: true });
      dispatch(setLogout());
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error('Logout failed.');
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-center">Login to Your Account</h2>
      {user ? (
        <div className="flex flex-col items-center space-y-4">
          <div className="text-lg">Welcome, {user.name}!</div>
          {user.role === 'admin' && (
            <>
              <div className="text-sm text-gray-500">You are logged in as an Admin</div>
              <button
                onClick={() => navigate("/admin")}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Admin Panel
              </button>
            </>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      ) : (
        <>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                <FaEnvelope className="text-gray-500" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 outline-none"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                <FaLock className="text-gray-500" />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter your password"
                  className="flex-1 outline-none"
                  required
                />
                <FaEye className="text-gray-400 cursor-pointer" />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-1">
                <input type="checkbox" />
                Remember me
              </label>
              <span className="text-blue-500 cursor-pointer">Forgot password?</span>
            </div>
            <button
              disabled={!email || !password}
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg "
            >
              Sign In
            </button>
          </form>
          <p className="text-center text-sm">
            Don't have an account?
            <span
              onClick={() => setIsLogin(false)}
              className="text-blue-500 cursor-pointer"
            >Sign Up</span>
          </p>
          <div className="flex items-center justify-between gap-2 text-sm">
            <div className="w-full border-t" />
            <span className="text-gray-500">Or With</span>
            <div className="w-full border-t" />
          </div>
          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100">
              <FcGoogle className="text-lg" />
              Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100">
              <FaApple className="text-lg" />
              Apple
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;