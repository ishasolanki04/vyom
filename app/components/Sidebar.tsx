'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChartBarIcon,
  HomeIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ShieldCheckIcon,
  ArrowTrendingUpIcon,
  DocumentTextIcon,
  CreditCardIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Analytics', href: '/dashboard/analytics', icon: ChartBarIcon },
  { name: 'Predictions', href: '/dashboard/predictions', icon: ArrowTrendingUpIcon },
  { name: 'Transactions', href: '/dashboard/transactions', icon: CreditCardIcon },
  { name: 'Documents', href: '/dashboard/documents', icon: DocumentTextIcon },
  { name: 'Beneficiaries', href: '/dashboard/beneficiaries', icon: UserGroupIcon },
  { name: 'Notifications', href: '/dashboard/notifications', icon: BellIcon },
  { name: 'Profile', href: '/dashboard/profile', icon: UserCircleIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`bg-white border-r border-gray-200 ${
      isCollapsed ? 'w-16' : 'w-64'
    } transition-all duration-300 flex flex-col`}>
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200">
        <Link href="/dashboard" className="flex items-center gap-2">
          <ShieldCheckIcon className="w-8 h-8 text-[#E31B54]" />
          {!isCollapsed && (
            <span className="text-xl font-bold text-gray-900">Vyom</span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#E31B54] bg-opacity-10 text-[#E31B54]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {!isCollapsed && (
                    <span className="text-sm font-medium">{item.name}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="h-16 border-t border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-500 transition-colors"
      >
        <svg
          className={`w-6 h-6 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        </svg>
      </button>
    </div>
  );
} 