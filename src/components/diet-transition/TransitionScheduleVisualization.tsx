"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, TrendingUp, Utensils } from "lucide-react";
import type { TransitionPlan } from "@/lib/types/transition";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface TransitionScheduleVisualizationProps {
  transitionPlan: TransitionPlan;
}

export function TransitionScheduleVisualization({
  transitionPlan,
}: TransitionScheduleVisualizationProps) {
  // Transition progress line chart
  const progressLineOptions: ApexOptions = {
    chart: {
      type: "line",
      height: 300,
      fontFamily: "Outfit, sans-serif",
      toolbar: {
        show: false,
      },
    },
    colors: ["#fb6514", "#22c55e"],
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 5,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    xaxis: {
      categories: transitionPlan.days.map((day) => `Day ${day.day}`),
      title: {
        text: "Transition Day",
      },
    },
    yaxis: {
      min: 0,
      max: 100,
      title: {
        text: "Percentage (%)",
      },
      labels: {
        formatter: (val: number) => `${val}%`,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
    grid: {
      show: true,
      borderColor: "#e5e7eb",
      strokeDashArray: 3,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (val: number) => `${val}%`,
      },
    },
  };

  const progressLineSeries = [
    {
      name: "Current Food",
      data: transitionPlan.days.map((day) => day.oldFoodPercent),
    },
    {
      name: "New Food",
      data: transitionPlan.days.map((day) => day.newFoodPercent),
    },
  ];

  // Transition progress area chart
  const progressAreaOptions: ApexOptions = {
    chart: {
      type: "area",
      height: 300,
      fontFamily: "Outfit, sans-serif",
      toolbar: {
        show: false,
      },
      stacked: true,
    },
    colors: ["#fb6514", "#22c55e"],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.6,
        opacityTo: 0.3,
      },
    },
    xaxis: {
      categories: transitionPlan.days.map((day) => `Day ${day.day}`),
      title: {
        text: "Transition Day",
      },
    },
    yaxis: {
      min: 0,
      max: 100,
      title: {
        text: "Percentage (%)",
      },
      labels: {
        formatter: (val: number) => `${val}%`,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
    grid: {
      show: true,
      borderColor: "#e5e7eb",
      strokeDashArray: 3,
    },
    tooltip: {
      shared: true,
      y: {
        formatter: (val: number) => `${val}%`,
      },
    },
  };

  const progressAreaSeries = [
    {
      name: "Current Food",
      data: transitionPlan.days.map((day) => day.oldFoodPercent),
    },
    {
      name: "New Food",
      data: transitionPlan.days.map((day) => day.newFoodPercent),
    },
  ];

  const totalDays = transitionPlan.days.length;
  const currentDay = 1; // This would come from tracking, but for now showing day 1

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Transition Duration</p>
                <p className="text-3xl font-bold">{totalDays}</p>
                <p className="text-xs text-muted-foreground mt-1">days</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Starting Portion</p>
                <p className="text-3xl font-bold">
                  {transitionPlan.days[0].oldFoodCups}
                </p>
                <p className="text-xs text-muted-foreground mt-1">cups current food</p>
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
                <p className="text-sm text-muted-foreground mb-1">Final Portion</p>
                <p className="text-3xl font-bold">
                  {transitionPlan.days[totalDays - 1].newFoodCups}
                </p>
                <p className="text-xs text-muted-foreground mt-1">cups new food</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Food Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Food Transition</CardTitle>
          <CardDescription>From current food to new food</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-6 bg-muted/50 rounded-lg">
            <div className="flex-1 text-center">
              <div className="text-sm text-muted-foreground mb-2">Current Food</div>
              <div className="text-lg font-semibold">{transitionPlan.currentFood.brand}</div>
              <div className="text-sm text-muted-foreground">{transitionPlan.currentFood.productName}</div>
            </div>
            <div className="px-4">
              <ArrowRight className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1 text-center">
              <div className="text-sm text-muted-foreground mb-2">New Food</div>
              <div className="text-lg font-semibold">{transitionPlan.newFood.brand}</div>
              <div className="text-sm text-muted-foreground">{transitionPlan.newFood.productName}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Transition Progress (Line)</CardTitle>
            <CardDescription>Visual representation of food transition over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ReactApexChart
              options={progressLineOptions}
              series={progressLineSeries}
              type="line"
              height={300}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transition Progress (Area)</CardTitle>
            <CardDescription>Stacked area showing food mix percentages</CardDescription>
          </CardHeader>
          <CardContent>
            <ReactApexChart
              options={progressAreaOptions}
              series={progressAreaSeries}
              type="area"
              height={300}
            />
          </CardContent>
        </Card>
      </div>

      {/* Daily Schedule with Visual Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Transition Schedule</CardTitle>
          <CardDescription>Day-by-day breakdown with visual progress indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transitionPlan.days.map((day, index) => {
              const progress = ((index + 1) / totalDays) * 100;
              return (
                <div
                  key={day.day}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-sm font-semibold">
                        Day {day.day}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {Math.round(progress)}% complete
                      </span>
                    </div>
                    <div className="text-sm font-medium">
                      {day.oldFoodPercent}% / {day.newFoodPercent}%
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Current Food</div>
                      <div className="text-lg font-semibold">{day.oldFoodCups} cups</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">New Food</div>
                      <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                        {day.newFoodCups} cups
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex gap-1 h-2">
                      <div
                        className="bg-primary rounded-l"
                        style={{ width: `${day.oldFoodPercent}%` }}
                      />
                      <div
                        className="bg-green-500 rounded-r"
                        style={{ width: `${day.newFoodPercent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Current: {day.oldFoodPercent}%</span>
                      <span>New: {day.newFoodPercent}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}



