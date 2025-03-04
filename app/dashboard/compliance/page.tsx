'use client';

import { useState } from 'react';
import {
  ClipboardDocumentCheckIcon,
  DocumentChartBarIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  DocumentArrowDownIcon,
  ChartBarIcon,
  UserGroupIcon,
  GlobeAltIcon,
  ArrowTrendingUpIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';
import Select from '@/components/ui/Select';
import { COMPLIANCE_PERIODS, COMPLIANCE_REPORT_TYPES } from '@/constants';
import { formatPercentage } from '@/utils';

interface ComplianceMetric {
  id: string;
  name: string;
  value: number;
  trend: number;
  status: 'good' | 'warning' | 'critical';
}

interface ComplianceReport {
  id: string;
  title: string;
  type: 'kyc' | 'aml' | 'regulatory' | 'audit';
  date: string;
  status: 'completed' | 'pending' | 'in_progress';
  score: number;
}

export default function CompliancePage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [metrics] = useState<ComplianceMetric[]>([
    {
      id: '1',
      name: 'KYC Completion Rate',
      value: 95,
      trend: 2.5,
      status: 'good',
    },
    {
      id: '2',
      name: 'AML Screening Score',
      value: 88,
      trend: -1.2,
      status: 'warning',
    },
    {
      id: '3',
      name: 'Regulatory Compliance',
      value: 92,
      trend: 1.8,
      status: 'good',
    },
    {
      id: '4',
      name: 'Risk Assessment',
      value: 78,
      trend: -3.5,
      status: 'critical',
    },
  ]);

  const [reports] = useState<ComplianceReport[]>([
    {
      id: '1',
      title: 'Monthly KYC Audit Report',
      type: 'kyc',
      date: '2024-03-15T10:30:00',
      status: 'completed',
      score: 95,
    },
    {
      id: '2',
      title: 'AML Transaction Monitoring',
      type: 'aml',
      date: '2024-03-15T09:45:00',
      status: 'in_progress',
      score: 88,
    },
    {
      id: '3',
      title: 'Quarterly Regulatory Review',
      type: 'regulatory',
      date: '2024-03-15T08:15:00',
      status: 'pending',
      score: 0,
    },
    {
      id: '4',
      title: 'Internal Compliance Audit',
      type: 'audit',
      date: '2024-03-14T15:30:00',
      status: 'completed',
      score: 92,
    },
  ]);

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || report.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getMetricColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-600 bg-green-50';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
      case 'critical':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getReportIcon = (type: string) => {
    switch (type) {
      case 'kyc':
        return <UserGroupIcon className="w-6 h-6" />;
      case 'aml':
        return <ShieldCheckIcon className="w-6 h-6" />;
      case 'regulatory':
        return <ClipboardDocumentCheckIcon className="w-6 h-6" />;
      case 'audit':
        return <DocumentChartBarIcon className="w-6 h-6" />;
      default:
        return <DocumentTextIcon className="w-6 h-6" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'in_progress':
        return 'text-blue-600 bg-blue-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const complianceSummary = {
    overallScore: 92,
    totalReports: reports.length,
    completedReports: reports.filter(r => r.status === 'completed').length,
    pendingReports: reports.filter(r => r.status === 'pending').length,
    inProgressReports: reports.filter(r => r.status === 'in_progress').length,
    riskLevel: 'Low',
    lastUpdated: new Date().toISOString(),
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Compliance Dashboard</h1>
        <p className="text-gray-600">Monitor and manage compliance metrics and reports</p>
      </div>

      {/* Compliance Summary */}
      <div className="card bg-white mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Overall Score */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Overall Compliance Score</h3>
            <div className="flex items-center gap-6">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-800">{complianceSummary.overallScore}%</span>
                </div>
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="60"
                    fill="none"
                    stroke="#F3F4F6"
                    strokeWidth="8"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="60"
                    fill="none"
                    stroke="#E31B54"
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 60 * (complianceSummary.overallScore / 100)} ${2 * Math.PI * 60}`}
                  />
                </svg>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-600">Completed ({formatPercentage(complianceSummary.completedReports / complianceSummary.totalReports)})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm text-gray-600">Pending ({formatPercentage(complianceSummary.pendingReports / complianceSummary.totalReports)})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-600">In Progress ({formatPercentage(complianceSummary.inProgressReports / complianceSummary.totalReports)})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="flex-1 border-l border-gray-200 pl-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Risk Assessment</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Risk Level</span>
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                  complianceSummary.riskLevel === 'Low' ? 'bg-green-50 text-green-600' :
                  complianceSummary.riskLevel === 'Medium' ? 'bg-yellow-50 text-yellow-600' :
                  'bg-red-50 text-red-600'
                }`}>
                  {complianceSummary.riskLevel}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Reports</span>
                <span className="font-medium text-gray-800">{complianceSummary.totalReports}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Last Updated</span>
                <span className="text-sm text-gray-500">
                  {new Date(complianceSummary.lastUpdated).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => (
          <div key={metric.id} className="card bg-white">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getMetricColor(metric.status)}`}>
                <span className="text-lg font-bold">{metric.value}%</span>
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                metric.trend > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                <ArrowTrendingUpIcon className={`w-4 h-4 ${
                  metric.trend > 0 ? '' : 'transform rotate-180'
                }`} />
                <span>{Math.abs(metric.trend)}%</span>
              </div>
            </div>
            <h3 className="font-medium text-gray-800">{metric.name}</h3>
            <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  metric.status === 'good'
                    ? 'bg-green-500'
                    : metric.status === 'warning'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${metric.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card bg-white mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search reports..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E31B54] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Select
              options={COMPLIANCE_PERIODS}
              value={selectedPeriod}
              onChange={setSelectedPeriod}
              className="w-40"
            />
            <Select
              options={COMPLIANCE_REPORT_TYPES}
              value={selectedType}
              onChange={setSelectedType}
              className="w-40"
            />
            <button className="flex items-center gap-2 px-4 py-2 bg-[#E31B54] text-white rounded-lg hover:bg-[#FF6B8B]">
              <DocumentArrowDownIcon className="w-5 h-5" />
              Download Reports
            </button>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <div className="card bg-white p-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <DocumentTextIcon className="w-12 h-12 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-800">No reports found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          </div>
        ) : (
          filteredReports.map((report) => (
            <div key={report.id} className="card bg-white hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  report.type === 'kyc' ? 'bg-blue-100 text-blue-600' :
                  report.type === 'aml' ? 'bg-green-100 text-green-600' :
                  report.type === 'regulatory' ? 'bg-purple-100 text-purple-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  {getReportIcon(report.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-gray-800">{report.title}</h3>
                      <p className="text-sm text-gray-500">
                        Generated on {new Date(report.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </span>
                      {report.score > 0 && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600">
                          {report.score}%
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button className="text-sm text-[#E31B54] hover:text-[#FF6B8B]">
                        View Report
                      </button>
                      <button className="text-sm text-gray-500 hover:text-gray-700">
                        Export PDF
                      </button>
                    </div>
                    {report.status === 'in_progress' && (
                      <div className="flex items-center gap-2 text-sm text-blue-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></div>
                        Processing
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredReports.length} of {reports.length} reports
        </p>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
            Previous
          </button>
          <button className="px-4 py-2 bg-[#E31B54] text-white rounded-lg hover:bg-[#FF6B8B]">
            Next
          </button>
        </div>
      </div>
    </div>
  );
} 