"use client";
import React from "react";
import Link from "next/link";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import type { Pet } from "@/lib/types/pet";

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

export default function PetsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="My Pets" />
      <Card className="border-2 border-primary/20 dark:border-primary/20 bg-white dark:bg-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-primary dark:text-primary">My Pets</CardTitle>
              <CardDescription className="text-secondary dark:text-secondary">Manage your pets and track their progress</CardDescription>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add Pet
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {mockPets.length === 0 ? (
            <div className="text-center p-content-lg">
              <p className="text-secondary dark:text-secondary mb-4">No pets added yet.</p>
              <Button className="bg-primary hover:bg-primary/90 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Pet
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Species</TableHead>
                    <TableHead>Breed</TableHead>
                    <TableHead>Current Weight</TableHead>
                    <TableHead>Target Weight</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPets.map((pet) => (
                    <TableRow key={pet.id}>
                      <TableCell className="font-medium">{pet.name}</TableCell>
                      <TableCell>
                        <Badge className="bg-tertiary text-primary dark:bg-tertiary/30 dark:text-primary border-primary/30 dark:border-primary/30">
                          {pet.species === 'dog' ? 'Dog' : 'Cat'}
                        </Badge>
                      </TableCell>
                      <TableCell>{pet.breed || '—'}</TableCell>
                      <TableCell>
                        {pet.currentWeight} {pet.weightUnit}
                      </TableCell>
                      <TableCell>
                        {pet.targetWeight} {pet.weightUnit}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/pets/${pet.id}`}>
                            <Button variant="ghost" size="sm" className="text-primary dark:text-primary/60 hover:bg-tertiary dark:hover:bg-primary/10">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm" className="text-primary dark:text-primary/60 hover:bg-tertiary dark:hover:bg-primary/10">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

