"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, Award, TrendingUp } from "lucide-react";
import type { GradingResult } from "@/lib/types/grading";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface FoodGraderResultsVisualizationProps {
  gradingResult: GradingResult;
  selectedFood: { brand: string; productName: string } | null;
}

export function FoodGraderResultsVisualization({
  gradingResult,
  selectedFood,
}: FoodGraderResultsVisualizationProps) {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A':
        return { bg: 'bg-green-500', text: 'text-green-500', border: 'border-green-500', light: 'bg-green-50 dark:bg-green-950' };
      case 'B':
        return { bg: 'bg-green-400', text: 'text-green-400', border: 'border-green-400', light: 'bg-green-50 dark:bg-green-950' };
      case 'C':
        return { bg: 'bg-yellow-500', text: 'text-yellow-500', border: 'border-yellow-500', light: 'bg-yellow-50 dark:bg-yellow-950' };
      case 'D':
        return { bg: 'bg-tertiary0', text: 'text-orange-500', border: 'border-orange-500', light: 'bg-tertiary dark:bg-primary/10' };
      case 'F':
        return { bg: 'bg-red-500', text: 'text-red-500', border: 'border-red-500', light: 'bg-red-50 dark:bg-red-950' };
      default:
        return { bg: 'bg-gray-500', text: 'text-gray-500', border: 'border-gray-500', light: 'bg-gray-50 dark:bg-gray-950' };
    }
  };

  const gradeColors = getGradeColor(gradingResult.overallGrade);

  // Category breakdown radar chart
  const categoryRadarOptions: ApexOptions = {
    chart: {
      type: "radar",
      height: 350,
      fontFamily: "Outfit, sans-serif",
      toolbar: {
        show: false,
      },
    },
    colors: ["#fb6514"],
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: "#e5e7eb",
          fill: {
            colors: ["#f9fafb", "#ffffff"],
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${Math.round(val)}`,
      style: {
        fontSize: "12px",
        fontWeight: 600,
      },
    },
    xaxis: {
      categories: gradingResult.categories.map((cat) => cat.name),
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val}/100`,
      },
    },
  };

  const categoryRadarSeries = [
    {
      name: "Score",
      data: gradingResult.categories.map((cat) => cat.score),
    },
  ];

  // Category breakdown bar chart
  const categoryBarOptions: ApexOptions = {
    chart: {
      type: "bar",
      height: 300,
      fontFamily: "Outfit, sans-serif",
      toolbar: {
        show: false,
      },
    },
    colors: gradingResult.categories.map((cat) => {
      if (cat.score >= 80) return "#22c55e";
      if (cat.score >= 60) return "#eab308";
      if (cat.score >= 40) return "#f97316";
      return "#ef4444";
    }),
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
        borderRadiusApplication: "end",
        dataLabels: {
          position: "end",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${Math.round(val)}`,
      style: {
        fontSize: "12px",
        fontWeight: 600,
        colors: ["#1f2937"],
      },
    },
    xaxis: {
      categories: gradingResult.categories.map((cat) => cat.name),
      max: 100,
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#e5e7eb",
      strokeDashArray: 3,
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val}/100`,
      },
    },
  };

  const categoryBarSeries = [
    {
      name: "Score",
      data: gradingResult.categories.map((cat) => cat.score),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Overall Grade Display */}
      <Card className={`border-2 ${gradeColors.border}`}>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div
                className={`w-32 h-32 rounded-full ${gradeColors.bg} text-white flex items-center justify-center text-6xl font-bold shadow-lg`}
              >
                {gradingResult.overallGrade}
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Overall Score</div>
                <div className="text-4xl font-bold mb-2">{gradingResult.overallScore}/100</div>
                <Badge variant="outline" className={`${gradeColors.text} ${gradeColors.border}`}>
                  <Award className="h-3 w-3 mr-1" />
                  {gradingResult.overallGrade === 'A' && 'Excellent Quality'}
                  {gradingResult.overallGrade === 'B' && 'Good Quality'}
                  {gradingResult.overallGrade === 'C' && 'Average Quality'}
                  {gradingResult.overallGrade === 'D' && 'Below Average'}
                  {gradingResult.overallGrade === 'F' && 'Poor Quality'}
                </Badge>
              </div>
            </div>
            {selectedFood && (
              <div className="text-right">
                <div className="text-sm text-muted-foreground mb-1">Food Analyzed</div>
                <div className="text-lg font-semibold">{selectedFood.brand}</div>
                <div className="text-sm text-muted-foreground">{selectedFood.productName}</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
            <CardDescription>Visual breakdown of category scores</CardDescription>
          </CardHeader>
          <CardContent>
            <ReactApexChart
              options={categoryRadarOptions}
              series={categoryRadarSeries}
              type="radar"
              height={350}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Scores</CardTitle>
            <CardDescription>Detailed category performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ReactApexChart
              options={categoryBarOptions}
              series={categoryBarSeries}
              type="bar"
              height={300}
            />
          </CardContent>
        </Card>
      </div>

      {/* Detailed Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
          <CardDescription>Individual category scores and analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {gradingResult.categories.map((category) => {
              const getCategoryColor = (score: number) => {
                if (score >= 80) return "text-green-600 dark:text-green-400";
                if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
                if (score >= 40) return "text-primary dark:text-primary/60";
                return "text-red-600 dark:text-red-400";
              };

              return (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className={`text-sm font-bold ${getCategoryColor(category.score)}`}>
                      {category.score}/100
                    </span>
                  </div>
                  <Progress value={category.score} className="h-3" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Positives and Concerns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gradingResult.positives.length > 0 && (
          <Card className="border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-5 w-5" />
                Strengths
              </CardTitle>
              <CardDescription>
                {gradingResult.positives.length} positive aspect{gradingResult.positives.length !== 1 ? 's' : ''} identified
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {gradingResult.positives.map((positive, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{positive}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {gradingResult.concerns.length > 0 && (
          <Card className="border-primary/30 dark:border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary dark:text-primary/60">
                <AlertTriangle className="h-5 w-5" />
                Areas for Consideration
              </CardTitle>
              <CardDescription>
                {gradingResult.concerns.length} concern{gradingResult.concerns.length !== 1 ? 's' : ''} identified
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {gradingResult.concerns.map((concern, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-primary dark:text-primary/60 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{concern}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}


