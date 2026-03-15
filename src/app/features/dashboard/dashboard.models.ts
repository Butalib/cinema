// src/app/features/dashboard/models/dashboard.models.ts
import { NgApexchartsModule } from "ng-apexcharts";

imports: [
  NgApexchartsModule
]
export interface StatCardData {
  id: string;
  title: string;
  value: string | number;
  trendValue: number; 
  isPositive: boolean; 
  iconClass: string; 
}

export interface ChartDataSeries {

  label: string[];
  data: number[];
}