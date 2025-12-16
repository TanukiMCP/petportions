"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Pet } from '@/lib/types/pet';

interface PetContextType {
  pets: Pet[];
  addPet: (pet: Omit<Pet, 'id'>) => void;
  updatePet: (id: string, updates: Partial<Pet>) => void;
  deletePet: (id: string) => void;
  getPet: (id: string) => Pet | undefined;
  loading: boolean;
}

const PetContext = createContext<PetContextType | undefined>(undefined);

const STORAGE_KEY = 'petportions-pets';

interface PetProviderProps {
  children: ReactNode;
}

export function PetProvider({ children }: PetProviderProps) {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  // Load pets from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedPets = JSON.parse(stored);
        setPets(parsedPets);
      }
    } catch (error) {
      console.error('Failed to load pets from localStorage:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save pets to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(pets));
      } catch (error) {
        console.error('Failed to save pets to localStorage:', error);
      }
    }
  }, [pets, loading]);

  const addPet = (petData: Omit<Pet, 'id'>) => {
    const newPet: Pet = {
      ...petData,
      id: Date.now().toString(), // Simple ID generation
    };
    setPets(prev => [...prev, newPet]);
  };

  const updatePet = (id: string, updates: Partial<Pet>) => {
    setPets(prev => 
      prev.map(pet => 
        pet.id === id ? { ...pet, ...updates } : pet
      )
    );
  };

  const deletePet = (id: string) => {
    setPets(prev => prev.filter(pet => pet.id !== id));
  };

  const getPet = (id: string) => {
    return pets.find(pet => pet.id === id);
  };

  const value: PetContextType = {
    pets,
    addPet,
    updatePet,
    deletePet,
    getPet,
    loading,
  };

  return (
    <PetContext.Provider value={value}>
      {children}
    </PetContext.Provider>
  );
}

export function usePetContext() {
  const context = useContext(PetContext);
  if (context === undefined) {
    throw new Error('usePetContext must be used within a PetProvider');
  }
  return context;
}
