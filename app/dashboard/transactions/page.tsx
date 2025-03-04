'use client';

import { useState, useEffect } from 'react';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  BanknotesIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowPathIcon,
  GlobeAltIcon,
  BuildingLibraryIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  category: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  merchant: string;
  riskScore: number;
  riskFactors: string[];
}

interface RiskAlert {
  id: string;
  severity: 'high' | 'medium' | 'low';
  message: string;
  timestamp: string;
  transactionId: string;
}

interface TransactionStats {
  totalTransactions: number;
  totalAmount: number;
  avgTransactionSize: number;
  avgRiskScore: number;
  pendingTransactions: number;
  failedTransactions: number;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [alerts, setAlerts] = useState<RiskAlert[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    riskLevel: 'all',
    dateRange: '7d'
  });
  const [showRiskDetails, setShowRiskDetails] = useState<string | null>(null);
  const [stats, setStats] = useState<TransactionStats>({
    totalTransactions: 0,
    totalAmount: 0,
    avgTransactionSize: 0,
    avgRiskScore: 0,
    pendingTransactions: 0,
    failedTransactions: 0
  });
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Mock data initialization
  useEffect(() => {
    const mockTransactions: Transaction[] = [
    {
      id: '1',
        type: 'debit',
        amount: 25000,
        description: 'Online Purchase - Amazon',
        category: 'Shopping',
        date: '2024-03-15T10:30:00',
      status: 'completed',
        merchant: 'Amazon',
        riskScore: 25,
        riskFactors: ['Large transaction amount', 'New merchant']
    },
    {
      id: '2',
        type: 'credit',
        amount: 50000,
        description: 'Salary Credit',
        category: 'Income',
        date: '2024-03-15T09:15:00',
        status: 'completed',
        merchant: 'ABC Corp',
        riskScore: 10,
        riskFactors: []
    },
    {
      id: '3',
        type: 'debit',
        amount: 75000,
        description: 'International Wire Transfer',
        category: 'Transfer',
        date: '2024-03-14T15:45:00',
        status: 'pending',
        merchant: 'International Bank',
        riskScore: 75,
        riskFactors: ['International transaction', 'Unusual amount', 'New beneficiary']
      }
    ];

    setTransactions(mockTransactions);

    // Calculate stats
    const stats: TransactionStats = {
      totalTransactions: mockTransactions.length,
      totalAmount: mockTransactions.reduce((sum, t) => sum + t.amount, 0),
      avgTransactionSize: Math.round(
        mockTransactions.reduce((sum, t) => sum + t.amount, 0) / mockTransactions.length
      ),
      avgRiskScore: Math.round(
        mockTransactions.reduce((sum, t) => sum + t.riskScore, 0) / mockTransactions.length
      ),
      pendingTransactions: mockTransactions.filter(t => t.status === 'pending').length,
      failedTransactions: mockTransactions.filter(t => t.status === 'failed').length
    };

    setStats(stats);

    // Mock alerts
    const mockAlerts: RiskAlert[] = [
      {
        id: '1',
        severity: 'high',
        message: 'Unusual international transfer detected',
        timestamp: '2024-03-15T10:30:00',
        transactionId: '3'
      },
      {
        id: '2',
        severity: 'medium',
        message: 'Large transaction amount',
        timestamp: '2024-03-15T09:15:00',
        transactionId: '1'
      }
    ];

    setAlerts(mockAlerts);
  }, []);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-red-600 bg-red-50';
    if (score >= 40) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <ClockIcon className="w-5 h-5 text-yellow-600" />;
      case 'failed':
        return <XCircleIcon className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const filteredTransactions = transactions.filter(t => {
    if (searchTerm && !t.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    if (filters.type !== 'all' && t.type !== filters.type) return false;
    if (filters.status !== 'all' && t.status !== filters.status) return false;
    
    if (filters.riskLevel !== 'all') {
      if (filters.riskLevel === 'high' && t.riskScore < 70) return false;
      if (filters.riskLevel === 'medium' && (t.riskScore < 40 || t.riskScore >= 70)) return false;
      if (filters.riskLevel === 'low' && t.riskScore >= 40) return false;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Transactions</h1>
        <p className="text-gray-600">
          Monitor and analyze transactions in real-time with advanced risk assessment
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Transactions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm">Total</p>
                <p className="text-gray-600 text-sm">Transactions</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <ChartBarIcon className="w-5 h-5 text-blue-500" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-4xl font-semibold text-gray-900 mb-3">{stats.totalTransactions}</p>
              <div className="flex items-center gap-1 text-sm">
                <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />
                <span className="text-green-600 font-medium">12%</span>
                <span className="text-gray-500">vs last week</span>
              </div>
            </div>
          </div>
        </div>

        {/* Total Amount */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <p className="text-gray-600 text-sm">Total Amount</p>
              <div className="p-2 bg-green-50 rounded-lg">
                <BanknotesIcon className="w-5 h-5 text-green-500" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-3xl font-semibold text-gray-900 mb-3">{formatAmount(stats.totalAmount)}</p>
              <div className="flex items-center gap-1 text-sm">
                <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />
                <span className="text-green-600 font-medium">8%</span>
                <span className="text-gray-500">vs last week</span>
              </div>
            </div>
          </div>
        </div>

        {/* Average Transaction */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <p className="text-gray-600 text-sm">Average Transaction</p>
              <div className="p-2 bg-blue-50 rounded-lg">
                <ArrowPathIcon className="w-5 h-5 text-blue-500" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-3xl font-semibold text-gray-900 mb-3">{formatAmount(stats.avgTransactionSize)}</p>
              <div className="flex items-center gap-1 text-sm">
                <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />
                <span className="text-red-600 font-medium">3%</span>
                <span className="text-gray-500">vs last week</span>
              </div>
            </div>
          </div>
        </div>

        {/* Average Risk Score */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
            <div>
                <p className="text-gray-600 text-sm">Average</p>
                <p className="text-gray-600 text-sm">Risk Score</p>
              </div>
              <div className="p-2 bg-red-50 rounded-lg">
                <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-4xl font-semibold text-gray-900 mb-3">{stats.avgRiskScore}</p>
              <div className="flex items-center gap-1 text-sm">
                <ArrowTrendingDownIcon className="w-4 h-4 text-green-500" />
                <span className="text-green-600 font-medium">5%</span>
                <span className="text-gray-500">vs last week</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <p className="text-gray-600 text-sm">Pending</p>
              <div className="p-2 bg-yellow-50 rounded-lg">
                <ClockIcon className="w-5 h-5 text-yellow-500" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-4xl font-semibold text-yellow-500 mb-3">{stats.pendingTransactions}</p>
              <div className="flex items-center gap-1 text-sm">
                <ArrowTrendingUpIcon className="w-4 h-4 text-yellow-500" />
                <span className="text-yellow-600 font-medium">2</span>
                <span className="text-gray-500">in progress</span>
              </div>
            </div>
          </div>
        </div>

        {/* Failed */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <p className="text-gray-600 text-sm">Failed</p>
              <div className="p-2 bg-red-50 rounded-lg">
                <XCircleIcon className="w-5 h-5 text-red-500" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-4xl font-semibold text-red-500 mb-3">{stats.failedTransactions}</p>
              <div className="flex items-center gap-1 text-sm">
                <ArrowTrendingDownIcon className="w-4 h-4 text-green-500" />
                <span className="text-green-600 font-medium">0</span>
                <span className="text-gray-500">in last 24h</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Alerts */}
      {alerts.length > 0 && (
        <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Risk Alerts</h3>
            <span className="text-sm text-gray-500">{alerts.length} active alerts</span>
          </div>
          <div className="space-y-4">
            {alerts.map(alert => (
              <div
                key={alert.id}
                className={`flex items-start gap-4 p-4 rounded-lg ${
                  alert.severity === 'high'
                    ? 'bg-red-50'
                    : alert.severity === 'medium'
                    ? 'bg-yellow-50'
                    : 'bg-blue-50'
                }`}
              >
                <ExclamationTriangleIcon className={`w-5 h-5 ${
                  alert.severity === 'high'
                    ? 'text-red-600'
                    : alert.severity === 'medium'
                    ? 'text-yellow-600'
                    : 'text-blue-600'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <div className="mt-1 flex items-center gap-4 text-sm">
                    <span className="text-gray-500">
                      {formatDateTime(alert.timestamp)}
                    </span>
                    <button
                      onClick={() => setSelectedTransaction(alert.transactionId)}
                      className="text-[#E31B54] hover:text-[#E31B54]/80"
                    >
                      View Transaction
        </button>
      </div>
                </div>
              </div>
            ))}
        </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1 w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31B54] focus:border-transparent text-sm"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FunnelIcon className="w-5 h-5" />
                Filters
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>

              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-100 p-4 z-10">
      <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Transaction Type
                      </label>
                      <div className="relative">
                        <select
                          value={filters.type}
                          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                          className="appearance-none w-full bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm text-gray-900 focus:ring-2 focus:ring-[#E31B54] focus:border-transparent"
                        >
                          <option value="all">All Types</option>
                          <option value="credit">Credit</option>
                          <option value="debit">Debit</option>
                        </select>
                        <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <div className="relative">
                        <select
                          value={filters.status}
                          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                          className="appearance-none w-full bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm text-gray-900 focus:ring-2 focus:ring-[#E31B54] focus:border-transparent"
                        >
                          <option value="all">All Statuses</option>
                          <option value="completed">Completed</option>
                          <option value="pending">Pending</option>
                          <option value="failed">Failed</option>
                        </select>
                        <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Risk Level
                      </label>
                      <div className="relative">
                        <select
                          value={filters.riskLevel}
                          onChange={(e) => setFilters({ ...filters, riskLevel: e.target.value })}
                          className="appearance-none w-full bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm text-gray-900 focus:ring-2 focus:ring-[#E31B54] focus:border-transparent"
                        >
                          <option value="all">All Risk Levels</option>
                          <option value="high">High Risk</option>
                          <option value="medium">Medium Risk</option>
                          <option value="low">Low Risk</option>
                        </select>
                        <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
              </div>

                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date Range
                      </label>
                      <div className="relative">
                        <select
                          value={filters.dateRange}
                          onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                          className="appearance-none w-full bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm text-gray-900 focus:ring-2 focus:ring-[#E31B54] focus:border-transparent"
                        >
                          <option value="7d">Last 7 days</option>
                          <option value="30d">Last 30 days</option>
                          <option value="90d">Last 90 days</option>
                          <option value="custom">Custom Range</option>
                        </select>
                        <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setFilters({
                            type: 'all',
                            status: 'all',
                            riskLevel: 'all',
                            dateRange: '7d'
                          });
                          setIsFilterOpen(false);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-[#E31B54] hover:text-[#E31B54]/80 transition-colors"
                      >
                        <ArrowPathIcon className="w-4 h-4" />
                        Reset
                      </button>
                  </div>
                  </div>
                </div>
              )}
                </div>
              </div>
            </div>
          </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className={`hover:bg-gray-50 ${
                    selectedTransaction === transaction.id ? 'bg-gray-50' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        transaction.type === 'credit' ? 'bg-green-50' : 'bg-blue-50'
                      }`}>
                        {transaction.type === 'credit' ? (
                          <ArrowTrendingUpIcon className="w-5 h-5 text-green-600" />
                        ) : (
                          <ArrowTrendingDownIcon className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {transaction.description}
                        </div>
                        <div className="text-sm text-gray-500">
                          {transaction.merchant}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-gray-900'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}
                      {formatAmount(transaction.amount)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(transaction.status)}
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getStatusColor(transaction.status)
                      }`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDateTime(transaction.date)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      getRiskColor(transaction.riskScore)
                    }`}>
                      {transaction.riskScore}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <button
                      onClick={() => setShowRiskDetails(
                        showRiskDetails === transaction.id ? null : transaction.id
                      )}
                      className="text-[#E31B54] hover:text-[#E31B54]/80"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 