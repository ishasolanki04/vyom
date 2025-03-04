'use client';

import { useState, useEffect } from 'react';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BoltIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  GlobeAltIcon,
  InformationCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentTextIcon,
  FingerPrintIcon,
  LockClosedIcon,
  CreditCardIcon,
  BuildingLibraryIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

interface RiskMetric {
  category: string;
  score: number;
  status: 'low' | 'medium' | 'high';
  lastUpdated: string;
  trend: 'up' | 'down' | 'stable';
  industryAvg: number;
  historicalScores: { date: string; score: number }[];
  details: {
    factors: string[];
    recommendations: string[];
  };
}

interface AnalyticsInsight {
  id: string;
  title: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  category: 'security' | 'spending' | 'risk' | 'behavioral';
  timestamp: string;
}

interface SpendingPattern {
  category: string;
  amount: number;
  trend: 'up' | 'down' | 'stable';
  riskLevel: 'low' | 'medium' | 'high';
  prediction: string;
}

interface BehavioralMetric {
  category: string;
  score: number;
  lastUpdated: string;
  anomalies: string[];
}

interface SecurityStatus {
  feature: string;
  enabled: boolean;
  lastVerified: string;
  requiresAction?: boolean;
}

interface NetworkNode {
  id: string;
  label: string;
  type: 'account' | 'merchant' | 'beneficiary';
  riskScore: number;
}

interface NetworkLink {
  source: string;
  target: string;
  value: number;
  type: 'transaction' | 'relationship';
}

function formatDateTime(date: string | Date) {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

function formatDate(date: string | Date) {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return date.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric'
  });
}

export default function AnalyticsPage() {
  const [riskScore, setRiskScore] = useState(20);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null);
  const [showBenchmarks, setShowBenchmarks] = useState(false);
  const [behavioralHealth, setBehavioralHealth] = useState(95);

  const [historicalScores] = useState([
    { date: '2024-03-15', score: 20 },
    { date: '2024-03-14', score: 22 },
    { date: '2024-03-13', score: 25 },
    { date: '2024-03-12', score: 18 },
    { date: '2024-03-11', score: 15 },
  ]);

  const [insights, setInsights] = useState<AnalyticsInsight[]>([
    {
      id: '1',
      title: 'Unusual Login Pattern Detected',
      description: 'Multiple login attempts from new locations in the past 24 hours.',
      impact: 'negative',
      category: 'security',
      timestamp: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Improved Security Score',
      description: 'Your security score has improved by 15% after enabling 2FA.',
      impact: 'positive',
      category: 'security',
      timestamp: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Predicted Spending Increase',
      description: 'Based on your patterns, expect higher spending next month.',
      impact: 'neutral',
      category: 'spending',
      timestamp: new Date().toISOString()
    }
  ]);

  const [riskMetrics] = useState<RiskMetric[]>([
    {
      category: 'Transaction Risk',
      score: 15,
      status: 'low',
      lastUpdated: '2024-03-15T10:30:00',
      trend: 'down',
      industryAvg: 25,
      historicalScores: [
        { date: '2024-03-15', score: 15 },
        { date: '2024-03-14', score: 18 },
        { date: '2024-03-13', score: 20 },
      ],
      details: {
        factors: [
          'Regular transaction patterns',
          'Known beneficiaries'
        ],
        recommendations: [
          'Enable transaction signing for high-value transfers'
        ]
      }
    },
    {
      category: 'Identity & Device Risk',
      score: 22,
      status: 'low',
      lastUpdated: '2024-03-15T10:30:00',
      trend: 'stable',
      industryAvg: 30,
      historicalScores: [
        { date: '2024-03-15', score: 22 },
        { date: '2024-03-14', score: 23 },
        { date: '2024-03-13', score: 24 },
      ],
      details: {
        factors: [
          'Biometric authentication active',
          'Trusted device',
          'Regular login patterns'
        ],
        recommendations: [
          'Review trusted devices list'
        ]
      }
    }
  ]);

  const [spendingPatterns] = useState<SpendingPattern[]>([
    {
      category: 'Online Shopping',
      amount: 25000,
      trend: 'up',
      riskLevel: 'medium',
      prediction: 'Expected to increase by 20% next month'
    },
    {
      category: 'Travel',
      amount: 50000,
      trend: 'down',
      riskLevel: 'low',
      prediction: 'Seasonal decrease expected'
    },
    {
      category: 'International Transfers',
      amount: 100000,
      trend: 'stable',
      riskLevel: 'high',
      prediction: 'Monitor for unusual patterns'
    }
  ]);

  const [behavioralMetrics] = useState<BehavioralMetric[]>([
    {
      category: 'Device Trust',
      score: 98,
      lastUpdated: new Date().toISOString(),
      anomalies: []
    },
    {
      category: 'Location Patterns',
      score: 95,
      lastUpdated: new Date().toISOString(),
      anomalies: ['New location detected: Singapore']
    },
    {
      category: 'Transaction Patterns',
      score: 92,
      lastUpdated: new Date().toISOString(),
      anomalies: ['Higher than usual international transfers']
    }
  ]);

  const [securityFeatures] = useState<SecurityStatus[]>([
    {
      feature: 'Advanced Authentication',
      enabled: true,
      lastVerified: '2024-03-15T10:30:00',
      requiresAction: false
    },
    {
      feature: 'Transaction Security',
      enabled: true,
      lastVerified: '2024-03-15T10:30:00',
      requiresAction: true
    },
    {
      feature: 'Device Trust',
      enabled: true,
      lastVerified: '2024-03-15T10:30:00',
      requiresAction: false
    }
  ]);

  const [networkData] = useState<{nodes: NetworkNode[], links: NetworkLink[]}>({
    nodes: [
      { id: '1', label: 'Main Account', type: 'account', riskScore: 15 },
      { id: '2', label: 'Merchant A', type: 'merchant', riskScore: 25 },
      { id: '3', label: 'Merchant B', type: 'merchant', riskScore: 45 },
      { id: '4', label: 'Beneficiary X', type: 'beneficiary', riskScore: 20 },
      { id: '5', label: 'Beneficiary Y', type: 'beneficiary', riskScore: 35 },
    ],
    links: [
      { source: '1', target: '2', value: 50000, type: 'transaction' },
      { source: '1', target: '3', value: 75000, type: 'transaction' },
      { source: '1', target: '4', value: 25000, type: 'transaction' },
      { source: 'user', target: 'amazon', value: 50000, type: 'transaction' },
      { source: 'salary', target: 'user', value: 100000, type: 'transaction' },
      { source: 'user', target: 'rent', value: 30000, type: 'transaction' }
    ]
  });

  const [secureDocuments] = useState([
    { name: 'Passport.pdf', type: 'Identity', lastUpdated: '2024-03-15' },
    { name: 'PAN Card.pdf', type: 'Identity', lastUpdated: '2024-03-15' },
    { name: 'Aadhaar.pdf', type: 'Identity', lastUpdated: '2024-03-15' }
  ]);

  const [securityTips] = useState([
    {
      title: 'Protect Your OTP',
      description: 'Never share OTPs, even with bank officials.',
      category: 'Authentication'
    },
    {
      title: 'Secure Passwords',
      description: 'Use strong, unique passwords for your accounts.',
      category: 'Account Security'
    },
    {
      title: 'Travel Safety',
      description: 'Enable travel mode before international trips.',
      category: 'Travel'
    }
  ]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'text-green-600 bg-green-50';
      case 'negative':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowTrendingUpIcon className="w-5 h-5 text-red-500" />;
      case 'down':
        return <ArrowTrendingDownIcon className="w-5 h-5 text-green-500" />;
      default:
        return <ChartBarIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'high':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const toggleMetricExpansion = (category: string) => {
    if (expandedMetric === category) {
      setExpandedMetric(null);
    } else {
      setExpandedMetric(category);
    }
  };

  const handleEmergencyFreeze = () => {
    alert('Account frozen! Contact support to unfreeze.');
  };

  useEffect(() => {
    const currentTime = new Date().toISOString();
    setInsights(prevInsights => 
      prevInsights.map(insight => ({
        ...insight,
        timestamp: currentTime
      }))
    );
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Analytics & Risk Management</h1>
        <p className="text-gray-600">Comprehensive risk analysis and AI-powered insights</p>
        </div>

      {/* Emergency Actions */}
      <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Emergency Actions</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <button
            onClick={handleEmergencyFreeze}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
          >
            <ShieldCheckIcon className="w-5 h-5" />
            Emergency Freeze
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors">
            <ExclamationTriangleIcon className="w-5 h-5" />
            Report Fraud
          </button>
        </div>
      </div>

      {/* Overall Risk Score with Historical Trend */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card bg-white col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Overall Risk Score</h2>
            <div className="flex items-center gap-2">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="text-sm border rounded-lg px-2 py-1 text-gray-600"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <button
                onClick={() => setShowBenchmarks(!showBenchmarks)}
                className="text-sm text-[#E31B54] hover:text-opacity-80 flex items-center gap-1"
              >
                <InformationCircleIcon className="w-5 h-5" />
                {showBenchmarks ? 'Hide' : 'Show'} Benchmarks
              </button>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-3xl font-bold text-gray-800">{riskScore}</div>
              </div>
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#E5E7EB"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#22C55E"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(riskScore / 100) * 351.86} 351.86`}
                  className="transition-all duration-1000"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Risk Level</p>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-600">
                Low Risk
          </div>
              <p className="text-sm text-gray-500 mt-2">
                Last updated: {formatDateTime(new Date().toISOString())}
          </p>
              {showBenchmarks && (
                <div className="mt-2 text-sm text-gray-600">
                  <p>Industry Average: 35/100</p>
                  <p>Peer Group Average: 28/100</p>
        </div>
              )}
            </div>
          </div>
          
          {/* Historical Score Trend */}
          <div className="mt-4">
            <div className="h-24 flex items-end justify-between">
              {historicalScores.map((score, index) => (
                <div key={score.date} className="flex flex-col items-center">
                  <div className="text-xs text-gray-500 mb-1">{score.score}</div>
                  <div 
                    className="w-8 bg-[#E31B54] bg-opacity-20 rounded-t"
                    style={{ height: `${score.score}%` }}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {formatDate(score.date)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Behavioral Health Summary */}
        <div className="card bg-white col-span-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Behavioral Health</h2>
          <div className="space-y-4">
            {behavioralMetrics.map(metric => (
              <div key={metric.category} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-900">{metric.category}</span>
                  <span className={`text-sm font-medium ${
                    metric.score >= 90 ? 'text-green-600' :
                    metric.score >= 70 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {metric.score}/100
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div
                    className={`rounded-full h-2.5 transition-all ${
                      metric.score >= 90 ? 'bg-green-600' :
                      metric.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${metric.score}%` }}
                  />
                </div>
                {metric.anomalies.length > 0 && (
                  <div className="mt-2">
                    {metric.anomalies.map((anomaly, index) => (
                      <div key={index} className="text-xs text-yellow-600 flex items-center gap-2">
                        <ExclamationTriangleIcon className="w-4 h-4" />
                        {anomaly}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI-Generated Insights */}
      <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">AI-Generated Insights</h2>
        <div className="space-y-4">
          {insights.map(insight => (
            <div
              key={insight.id}
              className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
            >
              <div className={`p-2 rounded-lg ${getImpactColor(insight.impact)}`}>
                {insight.category === 'security' ? (
                  <ShieldCheckIcon className="w-6 h-6" />
                ) : insight.category === 'spending' ? (
                  <ChartBarIcon className="w-6 h-6" />
                ) : (
                  <BoltIcon className="w-6 h-6" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  {insight.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <ClockIcon className="w-4 h-4" />
                  {formatDateTime(insight.timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Metrics with Drill-Down */}
      <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Risk Metrics</h2>
        <div className="space-y-4">
          {riskMetrics.map((metric) => (
            <div key={metric.category}>
              <div 
                className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
                onClick={() => toggleMetricExpansion(metric.category)}
              >
                <div className="flex items-center gap-3">
                  <ChartBarIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-700">{metric.category}</span>
                  {getTrendIcon(metric.trend)}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700">{metric.score}/100</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                    {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
                  </span>
                  {expandedMetric === metric.category ? (
                    <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
              
              {expandedMetric === metric.category && (
                <div className="mt-3 pl-10 pr-4 pb-2">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Contributing Factors:</p>
                      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                        {metric.details.factors.map((factor, index) => (
                          <li key={index}>{factor}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Recommendations:</p>
                      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                        {metric.details.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Historical Trend:</p>
                      <div className="h-16 flex items-end justify-between">
                        {metric.historicalScores.map((score) => (
                          <div key={score.date} className="flex flex-col items-center">
                            <div className="text-xs text-gray-500 mb-1">{score.score}</div>
                            <div 
                              className="w-6 bg-[#E31B54] bg-opacity-20 rounded-t"
                              style={{ height: `${score.score}%` }}
                            />
                            <div className="text-xs text-gray-500 mt-1">
                              {formatDate(score.date)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Industry Average: {metric.industryAvg}/100</span>
                      <span className="text-green-600">
                        {metric.score < metric.industryAvg ? 'Better than average' : 'Above average risk'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Network Analysis */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Network Analysis</h2>
              <p className="text-sm text-gray-500">Visualizing transaction relationships and risk patterns</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={() => {/* Add filter functionality */}}
              >
                Filter
                <ChevronDownIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Network Graph Placeholder */}
          <div className="relative bg-gray-50 rounded-lg border border-gray-200 h-96 mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <UserGroupIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Network visualization will be rendered here</p>
                <p className="text-xs text-gray-400">Using D3.js or react-force-graph</p>
        </div>
            </div>
          </div>

          {/* Network Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {networkData.nodes.map((node) => (
              <div key={node.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {node.type === 'account' && <BuildingLibraryIcon className="w-5 h-5 text-blue-500" />}
                  {node.type === 'merchant' && <CreditCardIcon className="w-5 h-5 text-green-500" />}
                  {node.type === 'beneficiary' && <UserGroupIcon className="w-5 h-5 text-purple-500" />}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{node.label}</p>
                    <p className="text-xs text-gray-500">Risk Score: {node.riskScore}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Spending Patterns */}
      <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Spending Patterns</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {spendingPatterns.map(pattern => (
            <div
              key={pattern.category}
              className="p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">
                  {pattern.category}
                </span>
                {getTrendIcon(pattern.trend)}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">
                ₹{pattern.amount.toLocaleString()}
              </div>
              <div className="mb-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(pattern.riskLevel)}`}>
                  {pattern.riskLevel.toUpperCase()} RISK
                </span>
              </div>
              <p className="text-sm text-gray-600">{pattern.prediction}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Security Features & Compliance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Security Features</h2>
          <div className="space-y-4">
            {securityFeatures.map((feature) => (
              <div key={feature.feature} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FingerPrintIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-700">{feature.feature}</span>
                </div>
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-600">
                  {feature.enabled ? 'Enabled' : 'Disabled'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Compliance Status</h2>
          <div className="space-y-4">
            {securityFeatures.map((feature) => (
              <div key={feature.feature} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldCheckIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-700">{feature.feature}</span>
                </div>
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-600">
                  {feature.requiresAction ? 'Requires Action' : 'Compliant'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secure Document Vault */}
      <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Secure Document Vault</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {secureDocuments.map(doc => (
            <div
              key={doc.name}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <DocumentTextIcon className="w-8 h-8 text-gray-400" />
              <div>
                <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                <div className="text-xs text-gray-500">
                  Updated: {formatDate(doc.lastUpdated)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Education Center */}
      <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Security Education</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {securityTips.map(tip => (
            <div
              key={tip.title}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <h3 className="text-sm font-medium text-gray-900 mb-2">{tip.title}</h3>
              <p className="text-xs text-gray-600 mb-3">{tip.description}</p>
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {tip.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 