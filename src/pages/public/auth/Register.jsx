import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import AuthLayout from "../../../layouts/auth/AuthLayout";
import { register, verifyOtp } from "../../../features/authentication/authAPI";
import { resetAuthError } from "../../../features/authentication/authSlice";

const Register = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, verifyPendingEmail } = useSelector((state) => state.auth);

  const pendingEmail = verifyPendingEmail || localStorage.getItem('pendingEmail') || "";
  const isOtpStep = Boolean(pendingEmail);

  useEffect(() => {
    if (verifyPendingEmail) {
      localStorage.setItem('pendingEmail', verifyPendingEmail);
    }
  }, [verifyPendingEmail]);

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(resetAuthError());
    dispatch(register({ firstName, lastName, email: email.trim().toLowerCase(), password }));
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    dispatch(resetAuthError());
    try {
      await dispatch(
        verifyOtp({
          email: pendingEmail.trim().toLowerCase(),
          otp: otp.trim(),
        })
      ).unwrap();
      localStorage.removeItem('pendingEmail');
      navigate('/login');
    } catch (err) {
      // Error is already stored in Redux and shown in UI
    }
  };

  const handleUseDifferentEmail = () => {
    localStorage.removeItem('pendingEmail');
    setOtp("");
  };

  return (
    <AuthLayout>
      <div className="py-6 px-2 sm:px-6">
        <h2 className="text-3xl font-extrabold mb-2 dark:text-white">
          {isOtpStep ? 'Verify your email' : 'Create your account'}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          {isOtpStep
            ? `We sent a 6-digit OTP to ${pendingEmail}. Enter it to complete your registration.`
            : 'Join BackBanchers - create an account to get started.'}
        </p>

        {!isOtpStep ? (
          <form onSubmit={handleRegister} className="space-y-4">
            {error && <div className="text-red-500 text-sm">{error.message || error}</div>}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-200">First name</label>
                <input value={firstName} onChange={(e)=>setFirstName(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-300" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-200">Last name</label>
                <input value={lastName} onChange={(e)=>setLastName(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-300" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-200">Email</label>
              <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-300" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-200">Password</label>
              <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-300" />
            </div>

            <div>
              <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md disabled:opacity-60">
                {loading ? 'Creating...' : 'Create account'}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            {error && <div className="text-red-500 text-sm">{error.message || error}</div>}

            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-200">Verification Code</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                inputMode="numeric"
                pattern="[0-9]{6}"
                title="Enter the 6-digit code"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-300"
                placeholder="123456"
              />
            </div>

            <div>
              <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md disabled:opacity-60">
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleUseDifferentEmail}
                className="text-sm text-indigo-500 font-medium"
              >
                Use different email
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 text-center text-sm text-gray-500">Already have an account? <Link to="/login" className="text-indigo-500 font-medium">Sign in</Link></div>
      </div>
    </AuthLayout>
  );
};

export default Register;
