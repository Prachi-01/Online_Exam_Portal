import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import LoadingSpinner from './LoadingSpinner';
import { FcGoogle } from 'react-icons/fc';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [user, loadingAuth] = useAuthState(auth);
  const provider = new GoogleAuthProvider();

  // Set authentication persistence
  useEffect(() => {
    auth.setPersistence('local');
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loadingAuth) {
      navigate('/', { replace: true });
    }
  }, [user, loadingAuth, navigate]);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await signInWithPopup(auth, provider);
      // Check if email is verified
      if (!result.user.emailVerified) {
        await result.user.sendEmailVerification();
      }
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      let errorMessage = 'Failed to sign in. Please try again.';
      
      switch (err.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Login popup was closed before completing.';
          break;
        case 'auth/cancelled-popup-request':
          errorMessage = 'Login process was cancelled.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection.';
          break;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loadingAuth || (user && loading)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center">
            <svg className="h-12 w-12 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L1 12h3v9h6v-6h4v6h6v-9h3L12 2z" />
            </svg>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          ExamPro Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to access your exams and results
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>If the problem persists, try:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Checking your internet connection</li>
                      <li>Disabling pop-up blockers</li>
                      <li>Trying a different browser</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6">
            <button
              onClick={handleLogin}
              disabled={loading}
              className={`w-full flex justify-center items-center gap-3 py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all ${
                loading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <FcGoogle className="h-5 w-5" />
                  <span>Sign in with Google</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Secure academic portal
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            By signing in, you agree to our{' '}
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;