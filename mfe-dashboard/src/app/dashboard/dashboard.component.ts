import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface KpiCard {
  label: string;
  value: string;
  change: number;
  icon: string;
  color: string;
}

interface Activity {
  user: string;
  action: string;
  time: string;
  avatar: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-wrapper">
      <div class="mfe-banner">
        📊 <strong>Dashboard MFE</strong> — running on port 4201, loaded remotely into the Shell
      </div>

      <h2>Dashboard Overview</h2>

      <div class="kpi-grid">
        @for (kpi of kpiCards; track kpi.label) {
          <div class="kpi-card" [style.border-color]="kpi.color">
            <div class="kpi-icon">{{ kpi.icon }}</div>
            <div class="kpi-info">
              <div class="kpi-label">{{ kpi.label }}</div>
              <div class="kpi-value">{{ kpi.value }}</div>
              <div class="kpi-change" [class.positive]="kpi.change > 0" [class.negative]="kpi.change < 0">
                {{ kpi.change > 0 ? '▲' : '▼' }} {{ kpi.change | number:'1.1-1' }}%
              </div>
            </div>
          </div>
        }
      </div>

      <div class="bottom-row">
        <div class="chart-placeholder">
          <h3>📈 Revenue Trend (last 7 days)</h3>
          <div class="bars">
            @for (bar of chartBars; track $index) {
              <div class="bar-wrap">
                <div class="bar" [style.height.%]="bar.pct" [style.background]="bar.color"></div>
                <span class="bar-label">{{ bar.day }}</span>
              </div>
            }
          </div>
        </div>

        <div class="activity-feed">
          <h3>🔔 Recent Activity</h3>
          <ul>
            @for (a of activities; track a.time) {
              <li>
                <span class="avatar">{{ a.avatar }}</span>
                <div>
                  <strong>{{ a.user }}</strong> {{ a.action }}
                  <div class="time">{{ a.time }}</div>
                </div>
              </li>
            }
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-wrapper { max-width: 1000px; margin: 0 auto; }
    .mfe-banner {
      background: linear-gradient(90deg, #0f3460, #16213e);
      color: #0ff; padding: 10px 18px; border-radius: 8px;
      margin-bottom: 20px; font-size: 13px;
    }
    h2 { color: #1a1a2e; margin-bottom: 20px; }
    .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
    .kpi-card {
      background: #fff; border-radius: 12px; padding: 20px;
      box-shadow: 0 2px 10px rgba(0,0,0,.07); border-left: 4px solid;
      display: flex; gap: 16px; align-items: center;
    }
    .kpi-icon { font-size: 32px; }
    .kpi-label { font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: .5px; }
    .kpi-value { font-size: 22px; font-weight: 700; color: #1a1a2e; }
    .kpi-change { font-size: 12px; font-weight: 600; }
    .positive { color: #22c55e; }
    .negative { color: #ef4444; }
    .bottom-row { display: grid; grid-template-columns: 1.5fr 1fr; gap: 20px; }
    .chart-placeholder, .activity-feed {
      background: #fff; border-radius: 12px; padding: 20px;
      box-shadow: 0 2px 10px rgba(0,0,0,.07);
    }
    h3 { margin: 0 0 16px; color: #1a1a2e; font-size: 15px; }
    .bars { display: flex; gap: 10px; align-items: flex-end; height: 140px; padding-top: 10px; }
    .bar-wrap { display: flex; flex-direction: column; align-items: center; flex: 1; height: 100%; justify-content: flex-end; }
    .bar { width: 100%; border-radius: 4px 4px 0 0; min-height: 10px; transition: height .3s; }
    .bar-label { font-size: 11px; color: #888; margin-top: 4px; }
    ul { list-style: none; padding: 0; margin: 0; }
    li { display: flex; gap: 10px; padding: 10px 0; border-bottom: 1px solid #f0f0f0; align-items: flex-start; }
    li:last-child { border-bottom: none; }
    .avatar { font-size: 24px; }
    .time { font-size: 11px; color: #aaa; margin-top: 2px; }
  `],
})
export class DashboardComponent implements OnInit {
  kpiCards: KpiCard[] = [
    { label: 'Total Revenue', value: '\$48,290', change: 12.4, icon: '💰', color: '#22c55e' },
    { label: 'Active Users',  value: '3,842',    change: 8.1,  icon: '👥', color: '#3b82f6' },
    { label: 'Orders Today',  value: '284',       change: -3.2, icon: '📦', color: '#f59e0b' },
    { label: 'Satisfaction',  value: '94.2%',     change: 2.0,  icon: '⭐', color: '#8b5cf6' },
  ];

  chartBars = [
    { day: 'Mon', pct: 55, color: '#3b82f6' },
    { day: 'Tue', pct: 72, color: '#3b82f6' },
    { day: 'Wed', pct: 48, color: '#3b82f6' },
    { day: 'Thu', pct: 90, color: '#e94560' },
    { day: 'Fri', pct: 65, color: '#3b82f6' },
    { day: 'Sat', pct: 80, color: '#22c55e' },
    { day: 'Sun', pct: 60, color: '#3b82f6' },
  ];

  activities: Activity[] = [
    { user: 'Alice',   action: 'placed a new order',       time: '2 min ago', avatar: '👩' },
    { user: 'Bob',     action: 'updated product catalog',  time: '15 min ago', avatar: '👨' },
    { user: 'Charlie', action: 'resolved support ticket',  time: '1 hr ago',   avatar: '🧑' },
    { user: 'Diana',   action: 'generated monthly report', time: '3 hrs ago',  avatar: '👩‍💼' },
  ];

  ngOnInit(): void {
    console.log('[mfe-dashboard] DashboardComponent loaded via Module Federation ✅');
  }
}

