interface StatusBadgeProps {
  status: string;
  type: 'severity' | 'status';
  className?: string;
}

export default function StatusBadge({ status, type, className = '' }: StatusBadgeProps) {
  const getStatusColor = (status: string, type: 'severity' | 'status') => {
    if (type === 'severity') {
      switch (status.toLowerCase()) {
        case 'high':
          return 'text-red-600 bg-red-50';
        case 'medium':
          return 'text-yellow-600 bg-yellow-50';
        case 'low':
          return 'text-green-600 bg-green-50';
        default:
          return 'text-gray-600 bg-gray-50';
      }
    } else {
      switch (status.toLowerCase()) {
        case 'completed':
        case 'resolved':
          return 'text-green-600 bg-green-50';
        case 'in_progress':
        case 'pending':
          return 'text-yellow-600 bg-yellow-50';
        case 'failed':
          return 'text-red-600 bg-red-50';
        default:
          return 'text-gray-600 bg-gray-50';
      }
    }
  };

  const formattedStatus = status
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status, type)} ${className}`}>
      {formattedStatus}
    </span>
  );
} 