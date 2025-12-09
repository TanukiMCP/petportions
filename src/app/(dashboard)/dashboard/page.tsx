import type { Metadata } from "next";
import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Calculator, ClipboardCheck, PawPrint, ArrowRightLeft, Plus, Dog, Cat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Pet } from "@/lib/types/pet";

export const metadata: Metadata = {
  title: "Dashboard | PetPortions",
  description: "PetPortions Dashboard",
};

const mockPets: Pet[] = [
  {
    id: '1',
    name: 'Max',
    species: 'dog',
    breed: 'Golden Retriever',
    currentWeight: 32,
    targetWeight: 29,
    weightUnit: 'kg',
  },
  {
    id: '2',
    name: 'Luna',
    species: 'cat',
    breed: 'Siamese',
    currentWeight: 4.8,
    targetWeight: 4.5,
    weightUnit: 'kg',
  },
  {
    id: '3',
    name: 'Buddy',
    species: 'dog',
    breed: 'Labrador Retriever',
    currentWeight: 28.5,
    targetWeight: 26,
    weightUnit: 'kg',
  },
];

export default function DashboardPage() {
  const displayPets = mockPets.slice(0, 3);
  const hasMorePets = mockPets.length > 3;

  return (
    <div className="page-spacing">
      <PageBreadcrumb pageTitle="Dashboard" />

      {/* Welcome Message */}
      <div>
        <h1 className="text-h1 mb-2 text-primary dark:text-primary">
          Welcome back!
        </h1>
        <p className="text-body-md text-secondary dark:text-secondary">
          Manage your pets' nutrition and track their health progress.
        </p>
      </div>

      {/* My Pets Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-h2 text-primary dark:text-primary">My Pets</h2>
          <Link href="/pets">
            <Button variant="outline" size="sm" className="border-primary/30 dark:border-primary/30 text-primary dark:text-primary hover:bg-tertiary dark:hover:bg-tertiary/30">View All</Button>
          </Link>
        </div>
        
        {displayPets.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-body-md text-muted mb-4">No pets added yet.</p>
              <Link href="/pets">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Pet
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-spacing-sm">
            {displayPets.map((pet) => (
              <Link key={pet.id} href={`/pets/${pet.id}`}>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full border-2 border-primary/20 dark:border-primary/20 hover:border-primary/40 dark:hover:border-primary/40 bg-white dark:bg-gray-800">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-primary dark:text-primary">{pet.name}</CardTitle>
                        <CardDescription className="text-secondary dark:text-secondary">{pet.breed || 'Unknown'}</CardDescription>
                      </div>
                      <Badge className="flex items-center gap-1 bg-tertiary text-primary dark:bg-tertiary/30 dark:text-primary border-primary/30 dark:border-primary/30">
                        {pet.species === 'dog' ? (
                          <Dog className="h-4 w-4" />
                        ) : (
                          <Cat className="h-4 w-4" />
                        )}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-body-sm">
                      <div className="flex justify-between">
                        <span className="text-secondary dark:text-secondary">Current Weight</span>
                        <span className="font-semibold text-foreground dark:text-foreground">
                          {pet.currentWeight} {pet.weightUnit}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary dark:text-secondary">Target Weight</span>
                        <span className="font-semibold text-foreground dark:text-foreground">
                          {pet.targetWeight} {pet.weightUnit}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary dark:text-secondary">Difference</span>
                        <span className={`font-semibold ${
                          pet.currentWeight > pet.targetWeight 
                            ? 'text-red-600 dark:text-red-400' 
                            : 'text-green-600 dark:text-green-400'
                        }`}>
                          {Math.abs(pet.currentWeight - pet.targetWeight).toFixed(1)} {pet.weightUnit}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}

            {/* Add Pet Card */}
            <Link href="/pets">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full flex items-center justify-center border-2 border-dashed border-primary/30 dark:border-primary/30 hover:border-primary/50 dark:hover:border-primary/50 bg-tertiary/30 dark:bg-tertiary/20">
                <CardContent className="text-center py-12">
                  <Plus className="h-8 w-8 text-primary dark:text-primary mx-auto mb-2" />
                  <p className="text-body-sm font-semibold text-primary dark:text-primary">
                    Add Pet
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        )}
      </div>

      {/* Quick Tools Section */}
      <div>
        <h2 className="text-h2 mb-4 text-primary dark:text-primary">Quick Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 grid-spacing">
          {/* Feeding Calculator */}
          <Card className="border-2 border-primary/20 dark:border-primary/20 hover:border-primary/40 dark:hover:border-primary/40 bg-white dark:bg-gray-800">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-tertiary dark:bg-tertiary/30 flex items-center justify-center mb-3 border-2 border-primary/30 dark:border-primary/30">
                <Calculator className="h-6 w-6 text-primary dark:text-primary" />
              </div>
              <CardTitle className="text-primary dark:text-primary">Feeding Calculator</CardTitle>
              <CardDescription className="text-secondary dark:text-secondary">Calculate daily caloric needs</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/calculator">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Open Calculator</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Food Grader */}
          <Card className="border-2 border-primary/20 dark:border-primary/20 hover:border-primary/40 dark:hover:border-primary/40 bg-white dark:bg-gray-800">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-tertiary dark:bg-tertiary/30 flex items-center justify-center mb-3 border-2 border-primary/30 dark:border-primary/30">
                <ClipboardCheck className="h-6 w-6 text-primary dark:text-primary" />
              </div>
              <CardTitle className="text-primary dark:text-primary">Food Grader</CardTitle>
              <CardDescription className="text-secondary dark:text-secondary">Analyze food quality</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/food-grader">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Grade Food</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Diet Transition */}
          <Card className="border-2 border-primary/20 dark:border-primary/20 hover:border-primary/40 dark:hover:border-primary/40 bg-white dark:bg-gray-800">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-tertiary dark:bg-tertiary/30 flex items-center justify-center mb-3 border-2 border-primary/30 dark:border-primary/30">
                <ArrowRightLeft className="h-6 w-6 text-primary dark:text-primary" />
              </div>
              <CardTitle className="text-primary dark:text-primary">Diet Transition</CardTitle>
              <CardDescription className="text-secondary dark:text-secondary">Plan food transitions</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/diet-transition">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Plan Transition</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Weight Tracker */}
          <Card className="border-2 border-primary/20 dark:border-primary/20 hover:border-primary/40 dark:hover:border-primary/40 bg-white dark:bg-gray-800">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-tertiary dark:bg-tertiary/30 flex items-center justify-center mb-3 border-2 border-primary/30 dark:border-primary/30">
                <PawPrint className="h-6 w-6 text-primary dark:text-primary" />
              </div>
              <CardTitle className="text-primary dark:text-primary">Weight Tracker</CardTitle>
              <CardDescription className="text-secondary dark:text-secondary">Track your pet's weight</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/pets">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">View Weights</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div>
        <h2 className="text-h2 mb-4 text-primary dark:text-primary">Recent Activity</h2>
        <Card className="border-2 border-primary/20 dark:border-primary/20 bg-tertiary/30 dark:bg-tertiary/20">
          <CardContent className="text-center py-12">
            <p className="text-body-md text-secondary dark:text-secondary">No recent activity yet.</p>
            <p className="text-body-sm text-secondary dark:text-secondary mt-2">
              Start using the tools above to track your pet's nutrition.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
