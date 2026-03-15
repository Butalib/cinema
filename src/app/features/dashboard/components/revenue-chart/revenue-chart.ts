import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  viewChild,
} from '@angular/core';
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

@Component({
  selector: 'app-revenue-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './revenue-chart.html',
  styleUrl: './revenue-chart.scss',
})
export class RevenueChartComponent implements AfterViewInit, OnDestroy {
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('chartCanvas');
  private chart: Chart | null = null;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef().nativeElement;
    const ctx = canvas.getContext('2d')!;

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(6, 182, 212, 0.85)');
    gradient.addColorStop(1, 'rgba(6, 182, 212, 0.2)');

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Revenue',
            data: [4500, 5500, 5000, 6200, 5700, 6900],
            backgroundColor: gradient,
            borderColor: 'rgba(6, 182, 212, 0.9)',
            borderWidth: 1,
            borderRadius: 6,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 800,
          easing: 'easeInOutQuart',
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0b1220',
            titleColor: '#94a3b8',
            bodyColor: '#e2e8f0',
            borderColor: '#1e293b',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: (item) => ` $${(item.parsed.y ?? 0).toLocaleString()}`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            border: { color: '#1e293b' },
            ticks: {
              color: '#94a3b8',
              font: (ctx) => ({ size: ctx.chart.width < 400 ? 10 : 12 }),
              maxRotation: 0,
            },
          },
          y: {
            min: 0,
            max: 8000,
            grid: { color: 'rgba(30, 41, 59, 0.6)' },
            border: { dash: [4, 4], color: 'transparent' },
            ticks: {
              color: '#94a3b8',
              font: (ctx) => ({ size: ctx.chart.width < 400 ? 10 : 12 }),
              maxTicksLimit: 5,
              callback: (val) => `$${Number(val) / 1000}k`,
            },
          },
        },
      },
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
