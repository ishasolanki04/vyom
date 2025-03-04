'use client';

import { useState } from 'react';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BoltIcon,
  ShieldCheckIcon,
  BanknotesIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface PredictedRisk {
  category: string;
  currentScore: number;
  predictedScore: number;
  confidence: number;
  factors: string[];
  recommendations: string[];
}

interface TransactionForecast {
  category: string;
  currentVolume: number;
  predictedVolume: number;
  change: number;
  confidence: number;
  insights: string[];
}

interface SecurityPrediction {
  category: string;
  likelihood: number;
  impact: 'high' | 'medium' | 'low';
  timeframe: string;
  preventiveMeasures: string[];
}

export default function PredictionsPage() {
  const [riskPredictions] = useState<PredictedRisk[]>([
    {
      category: 'Identity Theft',
      currentScore: 15,
      predictedScore: 25,
      confidence: 85,
      factors: [
        'Increased login attempts from unknown devices',
        'Recent data breaches in similar sectors',
        'Seasonal patterns in fraud attempts'
      ],
      recommendations: [
        'Enable location-based authentication',
        'Implement behavioral biometrics',
        'Update security questions'
      ]
    },
    {
      category: 'Transaction Fraud',
      currentScore: 20,
      predictedScore: 18,
      confidence: 90,
      factors: [
        'Improved merchant risk scoring',
        'Enhanced device fingerprinting',
        'Better transaction patterns'
      ],
      recommendations: [
        'Continue monitoring high-risk merchants',
        'Update transaction limits',
        'Enable real-time notifications'
      ]
    }
  ]);

  const [transactionForecasts] = useState<TransactionForecast[]>([
    {
      category: 'International Transfers',
      currentVolume: 500000,
      predictedVolume: 650000,
      change: 30,
      confidence: 85,
      insights: [
        'Seasonal increase expected',
        'New corridors opening',
        'Favorable exchange rates'
      ]
    },
    {
      category: 'Domestic Payments',
      currentVolume: 1500000,
      predictedVolume: 1800000,
      change: 20,
      confidence: 92,
      insights: [
        'Growing user base',
        'Increased merchant adoption',
        'New payment methods'
      ]
    }
  ]);

  const [securityPredictions] = useState<SecurityPrediction[]>([
    {
      category: 'Account Takeover',
      likelihood: 35,
      impact: 'high',
      timeframe: 'Next 30 days',
      preventiveMeasures: [
        'Implement adaptive MFA',
        'Enhanced session monitoring',
        'Device trust scoring'
      ]
    },
    {
      category: 'Data Breach',
      likelihood: 15,
      impact: 'high',
      timeframe: 'Next 90 days',
      preventiveMeasures: [
        'Regular security audits',
        'Encryption upgrades',
        'Access control review'
      ]
    },
    {
      category: 'Payment Fraud',
      likelihood: 25,
      impact: 'medium',
      timeframe: 'Next 60 days',
      preventiveMeasures: [
        'Transaction monitoring',
        'Merchant risk assessment',
        'Fraud pattern analysis'
      ]
    }
  ]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">AI Predictions</h1>
        <p className="text-gray-600">Advanced risk forecasting and trend analysis</p>
      </div>

      {/* Risk Predictions */}
      <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Risk Predictions</h2>
        <div className="space-y-6">
          {riskPredictions.map(prediction => (
            <div
              key={prediction.category}
              className="bg-gray-50 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">
                  {prediction.category}
                </h3>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${getConfidenceColor(prediction.confidence)}`}>
                    {prediction.confidence}% confidence
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-600 mb-2">Current Risk Score</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {prediction.currentScore}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-2">Predicted Risk Score</div>
                  <div className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    {prediction.predictedScore}%
                    {prediction.predictedScore > prediction.currentScore ? (
                      <ArrowTrendingUpIcon className="w-5 h-5 text-red-500" />
                    ) : (
                      <ArrowTrendingDownIcon className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Contributing Factors</h4>
                  <ul className="space-y-1">
                    {prediction.factors.map((factor, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                        <BoltIcon className="w-4 h-4 text-yellow-500" />
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Recommendations</h4>
                  <ul className="space-y-1">
                    {prediction.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                        <ShieldCheckIcon className="w-4 h-4 text-green-500" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction Forecasts */}
      <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Transaction Forecasts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {transactionForecasts.map(forecast => (
            <div
              key={forecast.category}
              className="bg-gray-50 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-900">
                  {forecast.category}
                </h3>
                <span className={`text-sm font-medium ${getConfidenceColor(forecast.confidence)}`}>
                  {forecast.confidence}% confidence
                </span>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Current Volume</span>
                  <span className="text-sm font-medium text-gray-900">
                    ₹{forecast.currentVolume.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Predicted Volume</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">
                      ₹{forecast.predictedVolume.toLocaleString()}
                    </span>
                    <span className={`text-sm font-medium ${
                      forecast.change > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      ({forecast.change > 0 ? '+' : ''}{forecast.change}%)
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Key Insights</h4>
                <ul className="space-y-1">
                  {forecast.insights.map((insight, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <ChartBarIcon className="w-4 h-4 text-blue-500" />
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Predictions */}
      <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Security Event Predictions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {securityPredictions.map(prediction => (
            <div
              key={prediction.category}
              className="bg-gray-50 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">
                  {prediction.category}
                </h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getImpactColor(prediction.impact)}`}>
                  {prediction.impact.toUpperCase()}
                </span>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Likelihood</span>
                  <span className="text-sm font-medium text-gray-900">
                    {prediction.likelihood}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`rounded-full h-2 ${
                      prediction.likelihood > 66 ? 'bg-red-600' :
                      prediction.likelihood > 33 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${prediction.likelihood}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <ClockIcon className="w-4 h-4" />
                {prediction.timeframe}
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Preventive Measures</h4>
                <ul className="space-y-1">
                  {prediction.preventiveMeasures.map((measure, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <ShieldCheckIcon className="w-4 h-4 text-green-500" />
                      {measure}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 