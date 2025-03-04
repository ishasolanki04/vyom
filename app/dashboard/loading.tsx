'use client';

export default function DashboardLoading() {
  return (
    <div className="max-w-7xl mx-auto animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="relative mb-8 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 p-8 overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-32 bg-gray-300 rounded-lg"></div>
              <div className="h-8 w-px bg-gray-300"></div>
              <div className="h-6 w-24 bg-gray-300 rounded-lg"></div>
            </div>
            <div>
              <div className="h-8 w-48 bg-gray-300 rounded-lg mb-2"></div>
              <div className="h-4 w-32 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-gray-300 rounded-xl w-32 h-20"></div>
            <div className="px-4 py-2 bg-gray-300 rounded-xl w-32 h-20"></div>
          </div>
        </div>
      </div>

      {/* Smart Actions Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl p-6 bg-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gray-200"></div>
              <div className="h-6 w-24 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded-lg"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Account Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-6 w-32 bg-gray-200 rounded-lg"></div>
              <div className="h-6 w-24 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="rounded-2xl p-6 bg-gray-200">
                  <div className="flex justify-between items-start mb-6">
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-gray-300 rounded-lg"></div>
                      <div className="h-8 w-32 bg-gray-300 rounded-lg"></div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="h-4 w-20 bg-gray-300 rounded-lg"></div>
                      <div className="h-6 w-24 bg-gray-300 rounded-lg"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-20 bg-gray-300 rounded-lg"></div>
                      <div className="h-6 w-24 bg-gray-300 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column Skeleton */}
        <div className="space-y-6">
          <div className="rounded-2xl p-6 bg-white">
            <div className="h-6 w-32 bg-gray-200 rounded-lg mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 bg-gray-200 rounded-lg"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 