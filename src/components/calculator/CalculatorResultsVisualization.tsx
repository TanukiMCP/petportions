"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Flame, Utensils, Calendar, TrendingUp } from "lucide-react";
import type { FeedingCalculatorResult, PortionResult } from "@/lib/types/calculator";
import type { PetFood } from "@/lib/types/food";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface CalculatorResultsVisualizationProps {
  result: FeedingCalculatorResult;
  portionResult: PortionResult | null;
  selectedFood: PetFood | null;
  feedingFrequency?: 'SID' | 'BID' | 'TID';
}

export function CalculatorResultsVisualization({
  result,
  portionResult,
  selectedFood,
  feedingFrequency = 'BID',
}: CalculatorResultsVisualizationProps) {
  // Energy breakdown chart data
  const energyBreakdownOptions: ApexOptions = {
    chart: {
      type: "donut",
      height: 300,
      fontFamily: "Outfit, sans-serif",
      toolbar: {
        show: false,
      },
    },
    colors: ["#fb6514", "#f97316", "#fdba74"],
    labels: ["RER (Resting)", "Activity Factor", "Total Daily"],
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${Math.round(val)}%`,
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} kcal`,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "60%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "14px",
              fontWeight: 600,
            },
            value: {
              show: true,
              fontSize: "20px",
              fontWeight: 700,
              formatter: (val: string) => `${val} kcal`,
            },
            total: {
              show: true,
              label: "Daily Calories",
              fontSize: "16px",
              fontWeight: 600,
              formatter: () => `${result.dailyKcal} kcal`,
            },
          },
        },
      },
    },
  };

  // Calculate breakdown: RER, Activity Factor (MER - RER), and any additional (daily - MER)
  const activityFactor = result.merKcal - result.rerKcal;
  const additionalFactor = Math.max(0, result.dailyKcal - result.merKcal);
  
  const energyBreakdownSeries = [
    result.rerKcal,
    activityFactor,
    additionalFactor > 0 ? additionalFactor : result.dailyKcal - result.rerKcal - activityFactor,
  ];

  // Meal distribution chart
  const mealDistributionOptions: ApexOptions = {
    chart: {
      type: "bar",
      height: 200,
      fontFamily: "Outfit, sans-serif",
      toolbar: {
        show: false,
      },
    },
    colors: ["#fb6514"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        borderRadius: 6,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val} kcal`,
      style: {
        fontSize: "12px",
        fontWeight: 600,
      },
    },
    xaxis: {
      categories: Array.from({ length: result.mealsPerDay }, (_, i) => `Meal ${i + 1}`),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        text: "Calories (kcal)",
      },
    },
    grid: {
      show: true,
      borderColor: "#e5e7eb",
      strokeDashArray: 3,
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} kcal per meal`,
      },
    },
  };

  const mealDistributionSeries = [
    {
      name: "Calories per Meal",
      data: Array(result.mealsPerDay).fill(result.perMealKcal),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Daily Calories</p>
                <p className="text-3xl font-bold text-primary">{result.dailyKcal}</p>
                <p className="text-xs text-muted-foreground mt-1">kcal/day</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Flame className="h-8 w-8 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Per Meal</p>
                <p className="text-3xl font-bold">{result.perMealKcal}</p>
                <p className="text-xs text-muted-foreground mt-1">kcal</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Utensils className="h-8 w-8 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Meals Per Day</p>
                <p className="text-3xl font-bold">{result.mealsPerDay}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {feedingFrequency === 'SID' ? 'Once daily' :
                   feedingFrequency === 'BID' ? 'Twice daily' : 'Three times daily'}
                </p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Energy Breakdown Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Energy Breakdown</CardTitle>
          <CardDescription>
            Visual breakdown of your pet's daily energy requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <ReactApexChart
                options={energyBreakdownOptions}
                series={energyBreakdownSeries}
                type="donut"
                height={300}
              />
            </div>
            <div className="space-y-4 flex flex-col justify-center">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">RER (Resting Energy)</span>
                  <span className="text-sm font-bold">{result.rerKcal} kcal</span>
                </div>
                <Progress value={(result.rerKcal / result.dailyKcal) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Base metabolic rate - energy needed at rest
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">MER (Maintenance Energy)</span>
                  <span className="text-sm font-bold">{result.merKcal} kcal</span>
                </div>
                <Progress value={(result.merKcal / result.dailyKcal) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Includes activity and life stage factors
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Daily Total</span>
                  <span className="text-sm font-bold text-primary">{result.dailyKcal} kcal</span>
                </div>
                <Progress value={100} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Total daily caloric requirement
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meal Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Meal Distribution</CardTitle>
          <CardDescription>
            Calorie distribution across {result.mealsPerDay} meals per day
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReactApexChart
            options={mealDistributionOptions}
            series={mealDistributionSeries}
            type="bar"
            height={200}
          />
        </CardContent>
      </Card>

      {/* Portion Recommendations */}
      {portionResult && selectedFood && (
        <Card>
          <CardHeader>
            <CardTitle>Portion Recommendations</CardTitle>
            <CardDescription>
              Based on {selectedFood.brand} - {selectedFood.productName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-6 border rounded-lg bg-primary/5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Utensils className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Per Meal</p>
                      <p className="text-2xl font-bold">{portionResult.cupsPerMealRounded}</p>
                      <p className="text-xs text-muted-foreground">
                        {portionResult.gramsPerMealRounded}g ({result.perMealKcal} kcal)
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground">
                      Each meal should contain this amount of food
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-6 border rounded-lg bg-primary/5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Per Day</p>
                      <p className="text-2xl font-bold">
                        {portionResult.cupsPerDay.toFixed(2)} cups
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {portionResult.gramsPerDay}g ({result.dailyKcal} kcal)
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground">
                      Total daily food requirement
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground">
                <strong>Food Details:</strong> {selectedFood.kcalPerCup} kcal/cup • {selectedFood.kcalPerKg} kcal/kg
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

