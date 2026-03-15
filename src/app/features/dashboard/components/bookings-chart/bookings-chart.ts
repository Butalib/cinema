import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  viewChild,
} from '@angular/core';
import {
  CategoryScale,
  Chart,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
);

@Component({
  selector: 'app-bookings-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bookings-chart.html',
  styleUrl: './bookings-chart.scss',
})
export class BookingsChartComponent implements AfterViewInit, OnDestroy {
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('chartCanvas');
  private chart: Chart | null = null;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef().nativeElement;
    const ctx = canvas.getContext('2d')!;

    const gradient = ctx.createLinearGradient(0, 0, 0, 280);
    gradient.addColorStop(0, 'rgba(6, 182, 212, 0.18)');
    gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Bookings',
            data: [15, 13, 19, 20, 27, 32, 30],
            borderColor: '#06b6d4',
            borderWidth: 2.5,
            backgroundColor: gradient,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#06b6d4',
            pointBorderColor: '#0b1220',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointHoverBackgroundColor: '#22d3ee',
            pointHoverBorderColor: '#0b1220',
            pointHoverBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 900,
          easing: 'easeInOutCubic',
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
              label: (item) => ` ${item.parsed.y} bookings`,
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
            max: 35,
            grid: { color: 'rgba(30, 41, 59, 0.6)' },
            border: { dash: [4, 4], color: 'transparent' },
            ticks: {
              color: '#94a3b8',
              font: (ctx) => ({ size: ctx.chart.width < 400 ? 10 : 12 }),
              stepSize: 5,
              maxTicksLimit: 5,
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
