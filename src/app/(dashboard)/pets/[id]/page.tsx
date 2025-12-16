"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import WeightChart from "@/components/charts/weight/WeightChart";
import { mockWeightEntries } from "@/lib/data/mock-weight-entries";
import { usePetContext } from "@/context/PetContext";
import type { Pet } from "@/lib/types/pet";

export default function PetDetailPage() {
  const params = useParams();
  const petId = params?.id as string;
  const { getPet, loading } = usePetContext();
  const [pet, setPet] = useState<Pet | null>(null);

  useEffect(() => {
    if (petId) {
      const foundPet = getPet(petId);
      setPet(foundPet || null);
    }
  }, [petId, getPet]);

  if (loading) {
    return (
      <div>
        <PageBreadcrumb pageTitle="Loading..." />
        <Card className="border-2 border-primary/20 dark:border-primary/20 bg-white dark:bg-gray-800">
          <CardContent className="py-12 text-center">
            <p className="text-secondary dark:text-secondary">Loading pet details...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!pet) {
    return (
      <div>
        <PageBreadcrumb pageTitle="Pet Not Found" />
        <Card className="border-2 border-primary/20 dark:border-primary/20 bg-white dark:bg-gray-800">
          <CardContent className="py-12 text-center">
            <p className="text-secondary dark:text-secondary mb-4">Pet not found.</p>
            <Link href="/pets">
              <Button variant="outline" className="border-primary/30 dark:border-primary/30 text-secondary dark:text-secondary hover:bg-tertiary dark:hover:bg-primary/10">Back to Pets</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const weightDifference = pet.currentWeight - pet.targetWeight;
  
  // Get weight entries for this pet
  const petWeightEntries = mockWeightEntries
    .filter((entry) => entry.petId === petId)
    .map((entry) => ({
      date: entry.date,
      weight: entry.weight,
    }));

  return (
    <div>
      <PageBreadcrumb pageTitle={pet.name} />
      <div className="content-spacing">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/pets">
              <Button variant="ghost" size="sm" className="text-primary dark:text-primary/60 hover:bg-tertiary dark:hover:bg-primary/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-primary dark:text-primary">{pet.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-tertiary text-primary dark:bg-tertiary/30 dark:text-primary border-primary/30 dark:border-primary/30">
                  {pet.species === 'dog' ? 'Dog' : 'Cat'}
                </Badge>
                {(pet as any).breed && <span className="text-secondary dark:text-secondary">{(pet as any).breed}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 grid-spacing-sm md:grid-cols-3">
          <Card className="border-2 border-primary/20 dark:border-primary/20 bg-white dark:bg-gray-800">
            <CardHeader className="pb-3">
              <CardDescription className="text-secondary dark:text-secondary">Current Weight</CardDescription>
              <CardTitle className="text-3xl text-primary dark:text-primary">
                {pet.currentWeight} kg
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-2 border-primary/20 dark:border-primary/20 bg-white dark:bg-gray-800">
            <CardHeader className="pb-3">
              <CardDescription className="text-secondary dark:text-secondary">Target Weight</CardDescription>
              <CardTitle className="text-3xl text-primary dark:text-primary">
                {pet.targetWeight} kg
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-2 border-primary/20 dark:border-primary/20 bg-white dark:bg-gray-800">
            <CardHeader className="pb-3">
              <CardDescription className="text-secondary dark:text-secondary">Weight Difference</CardDescription>
              <CardTitle className={`text-3xl ${
                weightDifference > 0 
                  ? 'text-red-600 dark:text-red-400' 
                  : weightDifference < 0 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-primary dark:text-primary'
              }`}>
                {weightDifference > 0 ? '+' : ''}
                {weightDifference.toFixed(1)} kg
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Weight History Section */}
        <Card className="border-2 border-primary/20 dark:border-primary/20 bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-primary dark:text-primary">Weight History</CardTitle>
            <CardDescription className="text-secondary dark:text-secondary">Track your pet's weight over time</CardDescription>
          </CardHeader>
          <CardContent>
            {petWeightEntries.length > 0 ? (
              <WeightChart
                weightEntries={petWeightEntries}
                targetWeight={pet.targetWeight}
                weightUnit="kg"
              />
            ) : (
              <div className="text-center py-12 text-secondary dark:text-secondary">
                <p>No weight entries yet. Start tracking your pet's weight to see progress here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

