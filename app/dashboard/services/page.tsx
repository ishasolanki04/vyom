'use client';

import { useState } from 'react';
import {
  CubeIcon,
  SparklesIcon,
  CreditCardIcon,
  BanknotesIcon,
  HomeIcon,
  TruckIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ArrowRightIcon,
  StarIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: 'banking' | 'loans' | 'investments' | 'insurance';
  matchScore: number;
  isRecommended: boolean;
  status: 'available' | 'coming_soon';
}

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const [services] = useState<Service[]>([
    {
      id: '1',
      title: 'Premium Savings Account',
      description: 'High-yield savings account with exclusive benefits',
      icon: BanknotesIcon,
      category: 'banking',
      matchScore: 95,
      isRecommended: true,
      status: 'available',
    },
    {
      id: '2',
      title: 'Home Loan',
      description: 'Competitive mortgage rates with flexible terms',
      icon: HomeIcon,
      category: 'loans',
      matchScore: 88,
      isRecommended: true,
      status: 'available',
    },
    {
      id: '3',
      title: 'Vehicle Financing',
      description: 'Auto loans with quick approval process',
      icon: TruckIcon,
      category: 'loans',
      matchScore: 75,
      isRecommended: false,
      status: 'available',
    },
    {
      id: '4',
      title: 'Term Insurance',
      description: 'Comprehensive life coverage for your family',
      icon: ShieldCheckIcon,
      category: 'insurance',
      matchScore: 92,
      isRecommended: true,
      status: 'available',
    },
    {
      id: '5',
      title: 'Mutual Funds',
      description: 'Expert-managed investment portfolios',
      icon: UserGroupIcon,
      category: 'investments',
      matchScore: 85,
      isRecommended: false,
      status: 'available',
    },
    {
      id: '6',
      title: 'AI Investment Advisor',
      description: 'Personalized investment recommendations powered by AI',
      icon: SparklesIcon,
      category: 'investments',
      matchScore: 90,
      isRecommended: true,
      status: 'coming_soon',
    },
  ]);

  const filteredServices = services.filter(
    (service) => selectedCategory === 'all' || service.category === selectedCategory
  );

  const categories = [
    { id: 'all', name: 'All Services', icon: CubeIcon },
    { id: 'banking', name: 'Banking', icon: BanknotesIcon },
    { id: 'loans', name: 'Loans', icon: HomeIcon },
    { id: 'investments', name: 'Investments', icon: ChartBarIcon },
    { id: 'insurance', name: 'Insurance', icon: ShieldCheckIcon },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Personalized Services</h1>
        <p className="text-gray-600">Discover financial services tailored to your needs</p>
      </div>

      {/* Featured Service Card */}
      <div className="card bg-gradient-to-r from-[#E31B54] to-[#FF6B8B] text-white p-8 mb-8 rounded-2xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-full">
              <SparklesIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Featured Service</span>
            </div>
            <h2 className="text-3xl font-bold">Premium Banking Package</h2>
            <p className="text-lg opacity-90">
              Get exclusive access to premium banking services, dedicated relationship manager, and
              special rates on loans.
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#E31B54] rounded-lg hover:bg-opacity-90 transition-colors font-medium">
              Learn More
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="w-48 h-48 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <CreditCardIcon className="w-24 h-24 text-white" />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors ${
              selectedCategory === category.id
                ? 'bg-[#E31B54] text-white shadow-md shadow-[#E31B54]/20'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <category.icon className="w-5 h-5" />
            {category.name}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="group relative bg-white rounded-xl p-6 transition-all hover:shadow-lg"
          >
            <div className="flex flex-col h-full">
              {/* Service Header */}
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  service.isRecommended ? 'bg-[#E31B54]/10 text-[#E31B54]' : 'bg-gray-100 text-gray-600'
                }`}>
                  <service.icon className="w-6 h-6" />
                </div>
                {service.isRecommended && (
                  <div className="flex items-center gap-1 px-2.5 py-1.5 bg-[#E31B54]/10 rounded-lg">
                    <StarIcon className="w-4 h-4 text-[#E31B54]" />
                    <span className="text-xs font-medium text-[#E31B54]">Recommended</span>
                  </div>
                )}
              </div>

              {/* Service Content */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
              </div>

              {/* Service Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                    <span className="text-xs font-medium text-green-600">{service.matchScore}%</span>
                  </div>
                  <span className="text-sm text-gray-500">Match Score</span>
                </div>
                {service.status === 'available' ? (
                  <button className="inline-flex items-center gap-1.5 text-sm font-medium text-[#E31B54] hover:text-[#FF6B8B] transition-colors">
                    Get Started
                    <ArrowRightIcon className="w-4 h-4" />
                  </button>
                ) : (
                  <span className="text-sm font-medium text-gray-400">Coming Soon</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 