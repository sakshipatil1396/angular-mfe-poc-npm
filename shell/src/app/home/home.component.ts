import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventBusService } from '../core/event-bus.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="home-container">
      <h1>Welcome to the MFE Shell 🏠</h1>
      <p class="subtitle">This shell hosts two independent Microfrontends loaded via <strong>Webpack 5 Module Federation</strong>.</p>

      <div class="cards">
        <div class="card">
          <div class="card-icon">📊</div>
          <h3>Dashboard MFE</h3>
          <p>Runs on <code>localhost:4201</code>. Loaded lazily when you navigate to <code>/dashboard</code>.</p>
        </div>
        <div class="card">
          <div class="card-icon">🛍️</div>
          <h3>Products MFE</h3>
          <p>Runs on <code>localhost:4202</code>. Loaded lazily when you navigate to <code>/products</code>.</p>
        </div>
      </div>

      <div class="event-log">
        <h3>📡 Cross-MFE Event Bus Log</h3>
        <div class="log-controls">
          <button (click)="emitTestEvent()">Emit Test Event</button>
          <button (click)="clearLog()">Clear</button>
        </div>
        <ul>
          @for (evt of eventLog; track $index) {
            <li>{{ evt }}</li>
          }
          @empty {
            <li class="empty">No events yet — navigate to an MFE or click "Emit Test Event"</li>
          }
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .home-container { max-width: 900px; margin: 0 auto; }
    h1 { font-size: 28px; color: #1a1a2e; margin-bottom: 8px; }
    .subtitle { color: #555; margin-bottom: 32px; }
    .cards { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 32px; }
    .card {
      background: #fff;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 12px rgba(0,0,0,.08);
      border-left: 4px solid #e94560;
    }
    .card-icon { font-size: 36px; margin-bottom: 12px; }
    .card h3 { margin: 0 0 8px; color: #1a1a2e; }
    .card p { color: #666; font-size: 14px; margin: 0; }
    code { background: #f0f0f0; padding: 2px 6px; border-radius: 4px; font-size: 13px; }
    .event-log {
      background: #1a1a2e;
      color: #0ff;
      border-radius: 12px;
      padding: 20px;
      font-family: monospace;
    }
    .event-log h3 { margin: 0 0 12px; color: #fff; font-family: sans-serif; }
    .log-controls { display: flex; gap: 8px; margin-bottom: 12px; }
    button {
      background: #e94560; color: #fff; border: none;
      padding: 6px 16px; border-radius: 6px; cursor: pointer; font-size: 13px;
    }
    button:hover { background: #c73652; }
    ul { list-style: none; padding: 0; margin: 0; max-height: 180px; overflow-y: auto; }
    li { padding: 4px 0; font-size: 13px; border-bottom: 1px solid rgba(255,255,255,.05); }
    li.empty { color: #888; font-style: italic; }
  `],
})
export class HomeComponent implements OnInit, OnDestroy {
  eventLog: string[] = [];
  private sub!: Subscription;

  constructor(private eventBus: EventBusService) {}

  ngOnInit(): void {
    this.sub = this.eventBus.all().subscribe((evt) => {
      const time = new Date().toLocaleTimeString();
      this.eventLog.unshift(`[${time}] ${evt.type} → ${JSON.stringify(evt.payload ?? {})}`);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  emitTestEvent(): void {
    this.eventBus.emit({ type: 'TEST_EVENT', payload: { from: 'shell', ts: Date.now() } });
  }

  clearLog(): void {
    this.eventLog = [];
  }
}

