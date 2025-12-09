"use client";
import React from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface WeightChartProps {
  weightEntries: Array<{ date: string; weight: number }>;
  targetWeight: number;
  weightUnit: 'kg' | 'lb';
}

export default function WeightChart({
  weightEntries,
  targetWeight,
  weightUnit,
}: WeightChartProps) {
  // Sort entries by date
  const sortedEntries = [...weightEntries].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const dates = sortedEntries.map((entry) => {
    const date = new Date(entry.date);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  const weights = sortedEntries.map((entry) => entry.weight);

  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
    },
    colors: ["#fb6514"], // PetPortions orange
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 350,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.3,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    markers: {
      size: 5,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      x: {
        format: "MMM dd, yyyy",
      },
      y: {
        formatter: (value: number) => `${value} ${weightUnit}`,
      },
    },
    xaxis: {
      type: "category",
      categories: dates,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
        formatter: (value: number) => `${value} ${weightUnit}`,
      },
      title: {
        text: `Weight (${weightUnit})`,
        style: {
          fontSize: "14px",
          color: "#6B7280",
        },
      },
    },
    annotations: {
      yaxis: [
        {
          y: targetWeight,
          borderColor: "#ef4444",
          borderWidth: 2,
          label: {
            text: `Target: ${targetWeight} ${weightUnit}`,
            style: {
              color: "#fff",
              background: "#ef4444",
              fontSize: "12px",
              padding: {
                left: 5,
                right: 5,
                top: 2,
                bottom: 2,
              },
            },
          },
        },
      ],
    },
  };

  const series = [
    {
      name: "Weight",
      data: weights,
    },
  ];

  return (
    <div className="w-full">
      <div id="weightChart">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
}

