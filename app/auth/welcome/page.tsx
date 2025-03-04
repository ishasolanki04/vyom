'use client';

import { useState } from 'react';
import { 
  ShieldCheckIcon, 
  BanknotesIcon,
  DocumentCheckIcon,
  ChartBarIcon,
  BuildingOfficeIcon,
  ArrowRightIcon,
  UserGroupIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  LockClosedIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

export default function WelcomePage() {
  return (
    <main className="h-screen overflow-hidden bg-white">
      {/* Hero Section */}
      <div className="relative h-full bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        {/* Add navigation bar with logo */}
        <div className="absolute top-0 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center">
                <Image
                  src="/vyom.png"
                  alt="Vyom Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#E31B54]/20 via-transparent to-transparent"></div>
        
        <div className="relative h-[calc(100%-64px)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E31B54]/10 border border-[#E31B54]/20 mb-6">
                <ShieldCheckIcon className="w-4 h-4 text-[#E31B54]" />
                <span className="text-sm font-medium text-[#FF6B8B]">Bank Grade Security</span>
              </div>
              
              <div className="mb-6">
                <Image
                  src="/vyom.png"
                  alt="Vyom Logo"
                  width={180}
                  height={60}
                  className="h-15 w-auto mb-4"
                  priority
                />
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Welcome to Modern
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#E31B54] to-[#FF6B8B]">
                    Digital Banking
                  </span>
                </h1>
              </div>
              
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Experience secure, AI-powered banking with comprehensive financial solutions
                and world-class protection for your assets.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/auth/register"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#E31B54] to-[#FF6B8B] text-white font-medium hover:from-[#FF6B8B] hover:to-[#E31B54] transition-all duration-300"
                >
                  Open an Account
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
                <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white/20 hover:bg-white/5 transition-colors">
                  <PhoneIcon className="w-5 h-5" />
                  Contact Support
                </button>
              </div>

              <div className="mt-16 grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FF6B8B]">24/7</div>
                  <div className="text-sm text-gray-400">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FF6B8B]">100%</div>
                  <div className="text-sm text-gray-400">Secure</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FF6B8B]">Global</div>
                  <div className="text-sm text-gray-400">Access</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#E31B54]/10 to-[#FF6B8B]/10 rounded-3xl transform rotate-6"></div>
              <div className="relative bg-gradient-to-r from-gray-800 to-gray-700 rounded-3xl p-8 border border-gray-700">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/vyom.png"
                      alt="Vyom Logo"
                      width={100}
                      height={32}
                      className="h-8 w-auto"
                      priority
                    />
                    <div className="text-sm text-gray-400">Welcome</div>
                  </div>
                  <BanknotesIcon className="w-8 h-8 text-[#FF6B8B]" />
                </div>
                
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-gray-700/50">
                    <div className="flex items-center gap-3 mb-2">
                      <ShieldCheckIcon className="w-5 h-5 text-[#FF6B8B]" />
                      <span className="font-medium">AI-Powered Security</span>
                    </div>
                    <p className="text-sm text-gray-400">Advanced fraud detection and real-time monitoring</p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-gray-700/50">
                    <div className="flex items-center gap-3 mb-2">
                      <DocumentCheckIcon className="w-5 h-5 text-[#FF6B8B]" />
                      <span className="font-medium">Quick Verification</span>
                    </div>
                    <p className="text-sm text-gray-400">Seamless KYC process with instant approval</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 