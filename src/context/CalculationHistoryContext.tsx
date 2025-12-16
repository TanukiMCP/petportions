"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CalculationHistory {
  id: string;
  type: 'calculator' | 'grader' | 'transition';
  timestamp: number;
  data: any;
  result?: any;
}

interface CalculationHistoryContextType {
  history: CalculationHistory[];
  addCalculation: (calculation: Omit<CalculationHistory, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
  getRecentCalculations: (limit?: number) => CalculationHistory[];
  loading: boolean;
}

const CalculationHistoryContext = createContext<CalculationHistoryContextType | undefined>(undefined);

const STORAGE_KEY = 'petportions-calculation-history';

interface CalculationHistoryProviderProps {
  children: ReactNode;
}

export function CalculationHistoryProvider({ children }: CalculationHistoryProviderProps) {
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [loading, setLoading] = useState(true);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedHistory = JSON.parse(stored);
        setHistory(parsedHistory);
      }
    } catch (error) {
      console.error('Failed to load calculation history from localStorage:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
      } catch (error) {
        console.error('Failed to save calculation history to localStorage:', error);
      }
    }
  }, [history, loading]);

  const addCalculation = (calculation: Omit<CalculationHistory, 'id' | 'timestamp'>) => {
    const newCalculation: CalculationHistory = {
      ...calculation,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    
    setHistory(prev => [newCalculation, ...prev].slice(0, 50)); // Keep only last 50 calculations
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const getRecentCalculations = (limit: number = 5) => {
    return history.slice(0, limit);
  };

  const value: CalculationHistoryContextType = {
    history,
    addCalculation,
    clearHistory,
    getRecentCalculations,
    loading,
  };

  return (
    <CalculationHistoryContext.Provider value={value}>
      {children}
    </CalculationHistoryContext.Provider>
  );
}

export function useCalculationHistory() {
  const context = useContext(CalculationHistoryContext);
  if (context === undefined) {
    throw new Error('useCalculationHistory must be used within a CalculationHistoryProvider');
  }
  return context;
}
