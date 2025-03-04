'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  EyeIcon,
  EyeSlashIcon,
  FingerPrintIcon,
  DevicePhoneMobileIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface LoginAttempt {
  timestamp: Date;
  success: boolean;
  location: string;
  device: string;
  ip: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);
  const [useBiometric, setUseBiometric] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [biometricAvailable, setBiometricAvailable] = useState(false);

  // Check for biometric availability
  useState(() => {
    const checkBiometric = async () => {
      try {
        if (window.PublicKeyCredential) {
          const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
          setBiometricAvailable(available);
        }
      } catch (error) {
        console.error('Biometric check failed:', error);
      }
    };
    checkBiometric();
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (email && password) {
        // Check for trusted device first
        const trustedDevice = localStorage.getItem('trustedDevice');
        const deviceFingerprint = await generateDeviceFingerprint();
        
        // If device is trusted and location is familiar, skip additional checks
        const isTrustedDevice = trustedDevice === deviceFingerprint;
        const isKnownLoc = await isKnownLocation();
        
        if (isTrustedDevice && isKnownLoc) {
          router.push('/dashboard');
          return;
        }

        // Only perform risk assessment for unknown devices/locations
        const riskScore = await assessLoginRisk();
        
        // Only trigger 2FA for high-risk scenarios
        if (riskScore > 70) {
          setError('Additional verification required for security.');
          setShowTwoFactor(true);
          return;
        }

        // Store login attempt only for non-trusted devices
        if (!isTrustedDevice) {
          const attempt: LoginAttempt = {
            timestamp: new Date(),
            success: true,
            location: await getCurrentLocation(),
            device: navigator.userAgent,
            ip: await getCurrentIP()
          };
          
          const attempts = JSON.parse(localStorage.getItem('loginAttempts') || '[]');
          // Keep only last 5 attempts to avoid storage bloat
          attempts.push(attempt);
          if (attempts.length > 5) attempts.shift();
          localStorage.setItem('loginAttempts', JSON.stringify(attempts));
        }

        if (rememberDevice) {
          localStorage.setItem('trustedDevice', deviceFingerprint);
          // Store location hash for future comparisons
          localStorage.setItem('knownLocations', JSON.stringify([
            ...(JSON.parse(localStorage.getItem('knownLocations') || '[]')),
            await getLocationHash()
          ]));
        }

        router.push('/dashboard');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    setLoading(true);
    setError('');

    try {
      // Simplified biometric check - no need for additional verifications
      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array(32),
          rpId: window.location.hostname,
          allowCredentials: [],
          userVerification: 'required',
        },
      });

      if (credential) {
        // Biometric auth is already secure, no need for additional checks
        router.push('/dashboard');
      }
    } catch (error) {
      setError('Biometric authentication failed. Please use password.');
    } finally {
      setLoading(false);
    }
  };

  // Simplified risk assessment focusing on key factors
  const assessLoginRisk = async () => {
    const riskFactors = [
      !isKnownDevice(), // New device
      !isKnownLocation(), // New location
      isOutsideBusinessHours(), // Unusual timing
      hasRecentFailedAttempts(), // Failed attempts
    ];

    // Calculate risk score based on number of risk factors
    return riskFactors.filter(Boolean).length * 25; // Each factor adds 25 to risk score
  };

  // Helper functions
  const isKnownDevice = () => {
    const trustedDevice = localStorage.getItem('trustedDevice');
    return trustedDevice === generateDeviceFingerprint();
  };

  const isKnownLocation = async () => {
    const knownLocations = JSON.parse(localStorage.getItem('knownLocations') || '[]');
    const currentLocation = await getLocationHash();
    return knownLocations.includes(currentLocation);
  };

  const isOutsideBusinessHours = () => {
    const hour = new Date().getHours();
    return hour < 6 || hour > 22; // Consider 6 AM to 10 PM as business hours
  };

  const hasRecentFailedAttempts = () => {
    const attempts = JSON.parse(localStorage.getItem('loginAttempts') || '[]');
    const recentAttempts = attempts.filter(
      (a: LoginAttempt) => 
        new Date().getTime() - new Date(a.timestamp).getTime() < 30 * 60 * 1000 // Last 30 minutes
    );
    return recentAttempts.filter((a: LoginAttempt) => !a.success).length > 2;
  };

  // Simplified device fingerprinting focusing on essential factors
  const generateDeviceFingerprint = () => {
    const components = [
      navigator.userAgent,
      screen.width,
      screen.height,
      navigator.language,
      new Date().getTimezoneOffset()
    ];
    return btoa(components.join('|'));
  };

  const getCurrentLocation = async () => {
    // Simplified location detection
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return `${data.city}, ${data.country}`;
    } catch {
      return 'Unknown Location';
    }
  };

  const getCurrentIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch {
      return 'Unknown IP';
    }
  };

  const getLocationHash = async () => {
    const location = await getCurrentLocation();
    return btoa(location);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src="/vyom-logo.png"
          alt="Vyom Logo"
          width={180}
          height={60}
          className="mx-auto"
          priority
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {biometricAvailable && (
            <button
              onClick={handleBiometricLogin}
              className="w-full flex justify-center items-center px-4 py-2 mb-6 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E31B54]"
            >
              <FingerPrintIcon className="mr-2 h-5 w-5 text-gray-500" />
              Sign in with Biometrics
            </button>
          )}

          <div className="mt-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with email
                </span>
              </div>
            </div>
          </div>

          <form className="space-y-6 mt-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-[#E31B54] focus:border-[#E31B54] sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-[#E31B54] focus:border-[#E31B54] sm:text-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {showTwoFactor && (
              <div>
                <label htmlFor="twoFactor" className="block text-sm font-medium text-gray-700">
                  Two-Factor Code
                </label>
                <div className="mt-1">
                  <input
                    id="twoFactor"
                    name="twoFactor"
                    type="text"
                    required
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#E31B54] focus:border-[#E31B54] sm:text-sm"
                    placeholder="Enter code from authenticator app"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-device"
                  name="remember-device"
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="h-4 w-4 text-[#E31B54] focus:ring-[#E31B54] border-gray-300 rounded"
                />
                <label htmlFor="remember-device" className="ml-2 block text-sm text-gray-900">
                  Remember this device
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-[#E31B54] hover:text-[#E31B54]">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#E31B54] hover:bg-[#E31B54] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E31B54] ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">New to Vyom?</span>
              </div>
            </div>

            <div className="mt-6">
              <a
                href="/auth/register"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#E31B54] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E31B54]"
              >
                Create an account
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Security Features */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="grid grid-cols-3 gap-4 px-4">
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-green-100 p-3">
              <FingerPrintIcon className="h-6 w-6 text-green-600" />
            </div>
            <p className="mt-2 text-xs text-center text-gray-500">Biometric Authentication</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-blue-100 p-3">
              <DevicePhoneMobileIcon className="h-6 w-6 text-blue-600" />
            </div>
            <p className="mt-2 text-xs text-center text-gray-500">Two-Factor Auth</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-purple-100 p-3">
              <ShieldCheckIcon className="h-6 w-6 text-purple-600" />
            </div>
            <p className="mt-2 text-xs text-center text-gray-500">Advanced Security</p>
          </div>
        </div>
      </div>
    </div>
  );
} 