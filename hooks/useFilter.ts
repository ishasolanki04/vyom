import { useState, useCallback } from 'react';

interface FilterOptions {
  searchTerm?: string;
  type?: string;
  severity?: string;
  period?: string;
}

export function useFilter<T>(items: T[], filterFn: (item: T, options: FilterOptions) => boolean) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  const filteredItems = useCallback(() => {
    return items.filter(item =>
      filterFn(item, {
        searchTerm,
        type: selectedType,
        severity: selectedSeverity,
        period: selectedPeriod,
      })
    );
  }, [items, searchTerm, selectedType, selectedSeverity, selectedPeriod, filterFn]);

  return {
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType,
    selectedSeverity,
    setSelectedSeverity,
    selectedPeriod,
    setSelectedPeriod,
    filteredItems,
  };
} 