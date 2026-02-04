import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import AuthLayout from "../../../layouts/auth/AuthLayout";
import { register } from "../../../features/authentication/authAPI";
import { resetAuthError } from "../../../features/authentication/authSlice";

const Register = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, verifyPendingEmail } = useSelector((state) => state.auth);

  useEffect(() => {
    if (verifyPendingEmail) {
      localStorage.setItem('pendingEmail', verifyPendingEmail);
      navigate('/verify-otp', { state: { email: verifyPendingEmail } });
    }
  }, [verifyPendingEmail, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(resetAuthError());
    dispatch(register({ firstName, lastName, email, password }));
  };

  return (
    <AuthLayout>
      <div className="py-6 px-2 sm:px-6">
        <h2 className="text-3xl font-extrabold mb-2 dark:text-white">Create your account</h2>
        <p className="text-sm text-gray-500 mb-6">Join BackBanchers — create an account to get started.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              {loading ? 'Creating…' : 'Create account'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">Already have an account? <Link to="/login" className="text-indigo-500 font-medium">Sign in</Link></div>
      </div>
    </AuthLayout>
  );
};

export default Register;
