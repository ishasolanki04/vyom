'use client';

import { useState } from 'react';
import {
  Cog6ToothIcon,
  BellIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  UserCircleIcon,
  KeyIcon,
  DocumentTextIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  email: boolean;
  sms: boolean;
  push: boolean;
}

interface SecuritySetting {
  id: string;
  title: string;
  description: string;
  status: 'enabled' | 'disabled';
  lastUpdated?: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('security');

  const [notificationSettings] = useState<NotificationSetting[]>([
    {
      id: '1',
      title: 'Security Alerts',
      description: 'Get notified about important security events and login attempts',
      email: true,
      sms: true,
      push: true,
    },
    {
      id: '2',
      title: 'Transaction Updates',
      description: 'Receive updates about your transactions and transfers',
      email: true,
      sms: false,
      push: true,
    },
    {
      id: '3',
      title: 'Service Updates',
      description: 'Stay informed about new features and service improvements',
      email: true,
      sms: false,
      push: false,
    },
    {
      id: '4',
      title: 'Marketing Communications',
      description: 'Receive personalized offers and promotions',
      email: false,
      sms: false,
      push: false,
    },
  ]);

  const [securitySettings] = useState<SecuritySetting[]>([
    {
      id: '1',
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      status: 'enabled',
      lastUpdated: '2024-03-15T10:30:00',
    },
    {
      id: '2',
      title: 'Biometric Login',
      description: 'Use fingerprint or face recognition for quick access',
      status: 'enabled',
      lastUpdated: '2024-03-14T15:45:00',
    },
    {
      id: '3',
      title: 'Login Notifications',
      description: 'Get notified when someone logs into your account',
      status: 'enabled',
      lastUpdated: '2024-03-13T09:20:00',
    },
    {
      id: '4',
      title: 'Device Management',
      description: 'Manage devices that have access to your account',
      status: 'enabled',
      lastUpdated: '2024-03-12T14:15:00',
    },
  ]);

  const tabs = [
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'preferences', name: 'Preferences', icon: Cog6ToothIcon },
  ];

  const toggleNotification = (settingId: string, type: 'email' | 'sms' | 'push') => {
    // In a real app, this would update the state and make an API call
    console.log(`Toggling ${type} for setting ${settingId}`);
  };

  const toggleSecurity = (settingId: string) => {
    // In a real app, this would update the state and make an API call
    console.log(`Toggling security setting ${settingId}`);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Account Settings</h1>
        <p className="text-gray-600">Manage your account security and preferences</p>
      </div>

      {/* Settings Navigation */}
      <div className="flex border-b border-gray-200 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-[#E31B54] text-[#E31B54]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            {tab.name}
          </button>
        ))}
      </div>

      {/* Security Settings */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="card bg-white">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Security Settings</h2>
              <button className="flex items-center gap-2 text-sm text-[#E31B54] hover:text-[#FF6B8B]">
                <ArrowPathIcon className="w-4 h-4" />
                Update All
              </button>
            </div>
            <div className="space-y-6">
              {securitySettings.map((setting) => (
                <div key={setting.id} className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#E31B54] bg-opacity-10 flex items-center justify-center">
                      <KeyIcon className="w-5 h-5 text-[#E31B54]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{setting.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{setting.description}</p>
                      {setting.lastUpdated && (
                        <p className="text-xs text-gray-500">
                          Last updated: {new Date(setting.lastUpdated).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={setting.status === 'enabled'}
                      onChange={() => toggleSecurity(setting.id)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#E31B54] peer-focus:ring-opacity-20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E31B54]"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="card bg-white">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <DevicePhoneMobileIcon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">New device logged in</p>
                    <p className="text-sm text-gray-500">iPhone 13 Pro • Mumbai, India</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <KeyIcon className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Password changed</p>
                    <p className="text-sm text-gray-500">Security update completed</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">Yesterday</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification Settings */}
      {activeTab === 'notifications' && (
        <div className="card bg-white">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Notification Preferences</h2>
            <button className="text-sm text-[#E31B54] hover:text-[#FF6B8B]">Reset to Default</button>
          </div>
          <div className="space-y-6">
            {notificationSettings.map((setting) => (
              <div key={setting.id} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#E31B54] bg-opacity-10 flex items-center justify-center">
                    <BellIcon className="w-5 h-5 text-[#E31B54]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{setting.title}</h3>
                    <p className="text-sm text-gray-600">{setting.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 ml-14">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={setting.email}
                      onChange={() => toggleNotification(setting.id, 'email')}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#E31B54] peer-focus:ring-opacity-20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E31B54]"></div>
                    <span className="text-sm text-gray-600">Email</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={setting.sms}
                      onChange={() => toggleNotification(setting.id, 'sms')}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#E31B54] peer-focus:ring-opacity-20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E31B54]"></div>
                    <span className="text-sm text-gray-600">SMS</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={setting.push}
                      onChange={() => toggleNotification(setting.id, 'push')}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#E31B54] peer-focus:ring-opacity-20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E31B54]"></div>
                    <span className="text-sm text-gray-600">Push</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preferences */}
      {activeTab === 'preferences' && (
        <div className="space-y-6">
          <div className="card bg-white">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">General Preferences</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#E31B54] bg-opacity-10 flex items-center justify-center">
                    <GlobeAltIcon className="w-5 h-5 text-[#E31B54]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Language</h3>
                    <p className="text-sm text-gray-600">Choose your preferred language</p>
                  </div>
                </div>
                <select className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E31B54] focus:border-transparent">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#E31B54] bg-opacity-10 flex items-center justify-center">
                    <DocumentTextIcon className="w-5 h-5 text-[#E31B54]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Statement Format</h3>
                    <p className="text-sm text-gray-600">Choose your preferred format for statements</p>
                  </div>
                </div>
                <select className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E31B54] focus:border-transparent">
                  <option value="pdf">PDF</option>
                  <option value="csv">CSV</option>
                  <option value="excel">Excel</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card bg-white">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Profile Information</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                  <UserCircleIcon className="w-12 h-12 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Profile Picture</h3>
                  <p className="text-sm text-gray-600 mb-2">Upload a new profile picture</p>
                  <button className="text-sm text-[#E31B54] hover:text-[#FF6B8B]">
                    Change Picture
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E31B54] focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E31B54] focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 