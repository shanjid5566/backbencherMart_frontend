import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import AuthLayout from "../../../layouts/auth/AuthLayout";
import { verifyOtp } from "../../../features/authentication/authAPI";
import { resetAuthError } from "../../../features/authentication/authSlice";

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState( (location.state && location.state.email) || localStorage.getItem('pendingEmail') || "" );
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const { loading, error, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!email) {
      navigate('/register');
    }
  }, [email, navigate]);

  useEffect(() => {
    if (token) {
      localStorage.removeItem('pendingEmail');
      navigate('/');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(resetAuthError());
    dispatch(verifyOtp({ email, code }));
  };

  return (
    <AuthLayout>
      <div className="py-6 px-2 sm:px-6">
        <h2 className="text-3xl font-extrabold mb-2 dark:text-white">Verify your email</h2>
        <p className="text-sm text-gray-500 mb-6">We sent a verification code to <strong>{email}</strong>. Enter it below to verify your account.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-500 text-sm">{error.message || error}</div>}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-200">Verification Code</label>
            <input type="text" value={code} onChange={(e)=>setCode(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-300" placeholder="123456" />
          </div>

          <div>
            <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md disabled:opacity-60">
              {loading ? 'Verifying…' : 'Verify Code'}
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default VerifyOtp;
