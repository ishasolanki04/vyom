'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  BellIcon,
  CubeIcon,
  ClipboardDocumentCheckIcon,
  Cog6ToothIcon,
  ChatBubbleLeftRightIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  BanknotesIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

// Group navigation items for better organization
const navigationGroups = [
  {
    name: 'Overview',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
      { name: 'Analytics', href: '/dashboard/analytics', icon: ChartBarIcon },
    ],
  },
  {
    name: 'Money Management',
    items: [
      { name: 'Transactions', href: '/dashboard/transactions', icon: BanknotesIcon },
      { name: 'Services', href: '/dashboard/services', icon: CubeIcon },
    ],
  },
  {
    name: 'Security & Compliance',
    items: [
      { name: 'Security Alerts', href: '/dashboard/alerts', icon: BellIcon },
      { name: 'Compliance', href: '/dashboard/compliance', icon: ClipboardDocumentCheckIcon },
    ],
  },
  {
    name: 'Account',
    items: [
      { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
      { name: 'Support', href: '/dashboard/support', icon: ChatBubbleLeftRightIcon },
    ],
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const renderNavigationItems = () => (
    <nav className="flex-1 space-y-1 px-2">
      {navigationGroups.map((group) => (
        <div key={group.name} className="py-2">
          <h3 className="mb-1 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {group.name}
          </h3>
          {group.items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-[#E31B54] text-white'
                    : 'text-gray-700 hover:bg-[#E31B54] hover:bg-opacity-10 hover:text-[#E31B54]'
                }`}
              >
                <item.icon className="flex-shrink-0 w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg text-gray-500 hover:bg-gray-100 lg:hidden"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:hidden ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
          <Link href="/dashboard">
            <Image
              src="/vyom.png"
              alt="Vyom Logo"
              width={100}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col h-full overflow-y-auto">
          {renderNavigationItems()}
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col lg:w-64 bg-white border-r border-gray-200">
        <div className="flex h-16 items-center px-4 border-b border-gray-200">
          <Link href="/dashboard">
            <Image
              src="/vyom.png"
              alt="Vyom Logo"
              width={100}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </Link>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          {renderNavigationItems()}
          <div className="flex-shrink-0 border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <UserCircleIcon className="flex-shrink-0 w-9 h-9 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-700">Parth</p>
                <p className="text-xs text-gray-500">parth@vyom.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 