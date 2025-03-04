'use client';

import { useState } from 'react';
import {
  ExclamationTriangleIcon,
  BellAlertIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import Select, { SelectOption } from '@/components/ui/Select';

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  status: 'new' | 'in_progress' | 'resolved';
  timestamp: string;
}

export default function AlertsPage() {
  const [selectedSeverity, setSelectedSeverity] = useState<SelectOption>({ value: 'all', label: 'All Severities' });
  const [selectedStatus, setSelectedStatus] = useState<SelectOption>({ value: 'all', label: 'All Statuses' });

  const severityOptions: SelectOption[] = [
    { value: 'all', label: 'All Severities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' },
  ];

  const statusOptions: SelectOption[] = [
    { value: 'all', label: 'All Statuses' },
    { value: 'new', label: 'New' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
  ];

  const [alerts] = useState<Alert[]>([
    {
      id: '1',
      title: 'Suspicious Login Attempt',
      description: 'Multiple failed login attempts detected from an unknown IP address.',
      severity: 'high',
      status: 'new',
      timestamp: '2 minutes ago',
    },
    {
      id: '2',
      title: 'Large Transaction Alert',
      description: 'Unusual transaction pattern detected in your account.',
      severity: 'medium',
      status: 'in_progress',
      timestamp: '15 minutes ago',
    },
    {
      id: '3',
      title: 'Password Change',
      description: 'Your account password was recently changed.',
      severity: 'low',
      status: 'resolved',
      timestamp: '1 hour ago',
    },
  ]);

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSeverity = selectedSeverity.value === 'all' || alert.severity === selectedSeverity.value;
    const matchesStatus = selectedStatus.value === 'all' || alert.status === selectedStatus.value;
    return matchesSeverity && matchesStatus;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'text-blue-600 bg-blue-100';
      case 'in_progress':
        return 'text-yellow-600 bg-yellow-100';
      case 'resolved':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Security Alerts</h1>
        <p className="text-gray-600">Monitor and manage your security notifications</p>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-gray-800">
                {alerts.filter((a) => a.severity === 'high').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card bg-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <BellAlertIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Alerts</p>
              <p className="text-2xl font-bold text-gray-800">
                {alerts.filter((a) => a.status !== 'resolved').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card bg-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <ShieldCheckIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-gray-800">
                {alerts.filter((a) => a.status === 'resolved').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-64">
          <Select
            label="Severity"
            value={selectedSeverity}
            onChange={setSelectedSeverity}
            options={severityOptions}
          />
        </div>
        <div className="w-full md:w-64">
          <Select
            label="Status"
            value={selectedStatus}
            onChange={setSelectedStatus}
            options={statusOptions}
          />
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div key={alert.id} className="card bg-white hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getSeverityColor(alert.severity)}`}>
                <ExclamationTriangleIcon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-gray-800">{alert.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                  </div>
                  <span className="text-sm text-gray-500">{alert.timestamp}</span>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                    {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)} Priority
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                    {alert.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 