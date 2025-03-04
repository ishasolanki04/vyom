'use client';

import { useState } from 'react';
import {
  ShieldCheckIcon,
  BanknotesIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  GlobeAltIcon,
  ClockIcon,
  DocumentCheckIcon,
  CreditCardIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CurrencyRupeeIcon,
  ArrowPathIcon,
  EyeIcon,
  ArrowRightIcon,
  SparklesIcon,
  BeakerIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  CircleStackIcon,
  CpuChipIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { formatCurrency, formatPercentage } from '@/utils';
import Image from 'next/image';

interface Activity {
  id: string;
  type: 'transaction' | 'security' | 'compliance';
  title: string;
  description: string;
  time: string;
  status: 'completed' | 'pending' | 'failed';
}

interface SpendingCategory {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

interface FinancialGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  color: string;
}

export default function DashboardPage() {
  const [activities] = useState<Activity[]>([
    {
      id: '1',
      type: 'transaction',
      title: 'International Transfer',
      description: 'Transfer to ABC Corp completed successfully',
      time: '2 minutes ago',
      status: 'completed',
    },
    {
      id: '2',
      type: 'security',
      title: 'Suspicious Login Attempt',
      description: 'Login attempt blocked from unknown location',
      time: '15 minutes ago',
      status: 'failed',
    },
    {
      id: '3',
      type: 'compliance',
      title: 'Document Verification',
      description: 'KYC documents pending verification',
      time: '1 hour ago',
      status: 'pending',
    },
  ]);

  const [spendingCategories] = useState<SpendingCategory[]>([
    { category: 'Shopping', amount: 15000, percentage: 30, color: '#E31B54' },
    { category: 'Bills', amount: 12500, percentage: 25, color: '#FF6B8B' },
    { category: 'Food', amount: 10000, percentage: 20, color: '#FFA07A' },
    { category: 'Transport', amount: 7500, percentage: 15, color: '#FFB6C1' },
    { category: 'Others', amount: 5000, percentage: 10, color: '#FFC0CB' },
  ]);

  const [goals] = useState<FinancialGoal[]>([
    {
      id: '1',
      title: 'New Car',
      targetAmount: 1000000,
      currentAmount: 750000,
      deadline: '2024-12-31',
      color: '#E31B54',
    },
    {
      id: '2',
      title: 'Emergency Fund',
      targetAmount: 300000,
      currentAmount: 200000,
      deadline: '2024-06-30',
      color: '#FF6B8B',
    },
  ]);

  const aiInsights = [
    {
      id: '1',
      type: 'prediction',
      title: 'Spending Forecast',
      description: 'Based on your patterns, you might exceed your shopping budget by ₹5,000 this month.',
      action: 'View Budget Analysis',
      icon: BeakerIcon,
    },
    {
      id: '2',
      type: 'opportunity',
      title: 'Investment Opportunity',
      description: 'AI detected a potential 12% return opportunity in green energy funds.',
      action: 'Explore Investment',
      icon: RocketLaunchIcon,
    },
    {
      id: '3',
      type: 'security',
      title: 'Enhanced Security',
      description: 'AI monitoring detected and blocked 3 suspicious login attempts.',
      action: 'View Security Log',
      icon: ShieldCheckIcon,
    },
  ];

  const smartActions = [
    {
      id: '1',
      title: 'Smart Save',
      description: 'AI-powered automatic savings based on your spending patterns',
      icon: SparklesIcon,
      color: 'from-[#E31B54] to-[#FF6B8B]',
    },
    {
      id: '2',
      title: 'Risk Analysis',
      description: 'Real-time transaction risk assessment using AI',
      icon: CpuChipIcon,
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: '3',
      title: 'Smart Invest',
      description: 'AI-recommended investment opportunities',
      icon: LightBulbIcon,
      color: 'from-green-500 to-green-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="relative mb-8 rounded-2xl bg-gradient-to-br from-[#E31B54] to-[#FF6B8B] p-8 text-white overflow-hidden group hover:shadow-lg transition-all duration-300">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)] group-hover:bg-grid-white/20 transition-all duration-300"></div>
        <div className="relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/vyom.png"
                  alt="Vyom Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto transform group-hover:scale-105 transition-transform duration-300"
                  priority
                />
                <div className="h-8 w-px bg-white/20"></div>
                <div className="flex items-center gap-2">
                  <CpuChipIcon className="w-5 h-5 animate-pulse" />
                  <span className="text-sm font-medium">AI-Powered Insights</span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2 transform group-hover:translate-x-2 transition-transform duration-300">Welcome back, Parth!</h1>
                <p className="text-white/80">Your financial health score is excellent</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                <p className="text-sm font-medium">Net Worth</p>
                <p className="text-2xl font-bold">₹9,25,000</p>
              </div>
              <div className="px-4 py-2 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                <p className="text-sm font-medium">Monthly Growth</p>
                <div className="flex items-center gap-1">
                  <ArrowTrendingUpIcon className="w-4 h-4" />
                  <p className="text-2xl font-bold">12.5%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {smartActions.map((action) => (
          <button
            key={action.id}
            className="group relative overflow-hidden rounded-2xl p-6 hover:shadow-lg transition-all duration-300 bg-white"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <action.icon className="w-6 h-6 text-[#E31B54]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:translate-x-2 transition-transform duration-300">{action.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{action.description}</p>
              <div className="flex items-center text-[#E31B54] font-medium">
                <span>Get Started</span>
                <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Account Cards & Analytics */}
        <div className="md:col-span-2 space-y-6">
          {/* Account Cards Carousel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Your Accounts</h2>
              <button className="text-sm text-[#E31B54] hover:text-[#FF6B8B] flex items-center gap-1 group">
                Add Account <PlusIcon className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#E31B54] to-[#FF6B8B] rounded-2xl opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-6 text-white">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-sm opacity-90">Primary Account</p>
                      <p className="text-2xl font-bold mt-1 group-hover:translate-x-2 transition-transform duration-300">₹2,50,000</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                      <BanknotesIcon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-80">Monthly Spending</p>
                      <div className="flex items-center gap-1 mt-1">
                        <ArrowDownIcon className="w-4 h-4 text-red-300" />
                        <p className="font-medium">₹45,000</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Monthly Income</p>
                      <div className="flex items-center gap-1 mt-1">
                        <ArrowUpIcon className="w-4 h-4 text-green-300" />
                        <p className="font-medium">₹1,20,000</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-6 text-white">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-sm opacity-90">Savings Account</p>
                      <p className="text-2xl font-bold mt-1 group-hover:translate-x-2 transition-transform duration-300">₹5,75,000</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                      <CircleStackIcon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-80">Interest Rate</p>
                      <div className="flex items-center gap-1 mt-1">
                        <p className="font-medium">4.5% p.a.</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Last Transaction</p>
                      <div className="flex items-center gap-1 mt-1">
                        <ClockIcon className="w-4 h-4" />
                        <p className="font-medium">2 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-gray-800">AI Insights</h2>
                <span className="px-2 py-1 text-xs font-medium bg-[#E31B54] bg-opacity-10 text-[#E31B54] rounded-full">
                  Powered by AI
                </span>
              </div>
              <button className="text-sm text-[#E31B54] hover:text-[#FF6B8B]">View All</button>
            </div>
            <div className="space-y-4">
              {aiInsights.map((insight) => (
                <div
                  key={insight.id}
                  className="p-4 rounded-xl bg-white border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#E31B54] bg-opacity-10 flex items-center justify-center">
                      <insight.icon className="w-5 h-5 text-[#E31B54]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 mb-1">{insight.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                      <button className="text-sm text-[#E31B54] hover:text-[#FF6B8B] flex items-center gap-1">
                        {insight.action}
                        <ArrowRightIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Spending Analytics */}
          <div className="card bg-white">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-gray-800">Smart Analytics</h2>
                <span className="px-2 py-1 text-xs font-medium bg-green-50 text-green-600 rounded-full">
                  AI Optimized
                </span>
              </div>
              <button className="text-sm text-[#E31B54] hover:text-[#FF6B8B]">
                Download Report
              </button>
            </div>
            <div className="space-y-6">
              {spendingCategories.map((category) => (
                <div key={category.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></span>
                      <span className="text-sm text-gray-600">{category.category}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-gray-800">
                        {formatCurrency(category.amount)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatPercentage(category.percentage / 100)}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${category.percentage}%`, backgroundColor: category.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Smart Features */}
        <div className="space-y-6">
          {/* AI Assistant */}
          <div className="card bg-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#E31B54] bg-opacity-10 flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 text-[#E31B54]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">AI Assistant</h2>
                <p className="text-sm text-gray-600">Your personal financial advisor</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-3">Ask me anything about your finances:</p>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type your question..."
                    className="w-full pl-4 pr-12 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E31B54] focus:border-transparent"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-lg bg-[#E31B54] text-white flex items-center justify-center hover:bg-[#FF6B8B]">
                    <ArrowRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-gray-500">Suggested questions:</p>
                <button className="w-full text-left text-sm text-gray-600 hover:text-[#E31B54] p-2 rounded-lg hover:bg-gray-50">
                  How can I improve my savings?
                </button>
                <button className="w-full text-left text-sm text-gray-600 hover:text-[#E31B54] p-2 rounded-lg hover:bg-gray-50">
                  Analyze my investment portfolio
                </button>
              </div>
            </div>
          </div>

          {/* Smart Goals */}
          <div className="card bg-white">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Smart Goals</h2>
              <span className="px-2 py-1 text-xs font-medium bg-[#E31B54] bg-opacity-10 text-[#E31B54] rounded-full">
                AI Tracked
              </span>
            </div>
            <div className="space-y-6">
              {goals.map((goal) => (
                <div key={goal.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">{goal.title}</h3>
                      <p className="text-sm text-gray-500">
                        Target: {formatCurrency(goal.targetAmount)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-800">
                        {formatCurrency(goal.currentAmount)}
                      </p>
                      <p className="text-sm text-[#E31B54]">
                        {formatPercentage(goal.currentAmount / goal.targetAmount)}
                      </p>
                    </div>
                  </div>
                  <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(goal.currentAmount / goal.targetAmount) * 100}%`,
                        backgroundColor: goal.color,
                      }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      {new Date(goal.deadline).toLocaleDateString()}
                    </span>
                    <button className="text-[#E31B54] hover:text-[#FF6B8B]">
                      Adjust Goal
                    </button>
                  </div>
                </div>
              ))}
              <button className="w-full py-2 text-sm text-[#E31B54] hover:text-[#FF6B8B] border border-dashed border-gray-200 rounded-lg hover:border-[#E31B54]">
                + Add New Goal
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card bg-white">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#E31B54] bg-opacity-10 flex items-center justify-center">
                  <BanknotesIcon className="w-5 h-5 text-[#E31B54]" />
                </div>
                <span className="text-sm font-medium text-gray-800">Send Money</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#E31B54] bg-opacity-10 flex items-center justify-center">
                  <DocumentCheckIcon className="w-5 h-5 text-[#E31B54]" />
                </div>
                <span className="text-sm font-medium text-gray-800">Pay Bills</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 