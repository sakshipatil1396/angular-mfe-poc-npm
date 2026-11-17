import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="shell-header">
      <div class="logo">
        <span class="logo-icon">⚡</span>
        <span class="logo-text">MFE Shell</span>
        <span class="badge">Angular 20 + Module Federation</span>
      </div>
      <nav>
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Home</a>
        <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
        <a routerLink="/products" routerLinkActive="active">Products</a>
      </nav>
    </header>

    <main class="shell-content">
      <router-outlet />
    </main>

    <footer class="shell-footer">
      Shell App &mdash; Hosting remote MFEs via Webpack Module Federation
    </footer>
  `,
  styles: [`
    :host { display: flex; flex-direction: column; min-height: 100vh; }

    .shell-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      height: 60px;
      background: #1a1a2e;
      color: #fff;
      box-shadow: 0 2px 8px rgba(0,0,0,.35);
    }

    .logo { display: flex; align-items: center; gap: 10px; }
    .logo-icon { font-size: 22px; }
    .logo-text { font-weight: 700; font-size: 18px; letter-spacing: .5px; }
    .badge {
      background: #e94560;
      color: #fff;
      border-radius: 12px;
      padding: 2px 10px;
      font-size: 11px;
      font-weight: 600;
    }

    nav { display: flex; gap: 8px; }
    nav a {
      color: #ccc;
      text-decoration: none;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 14px;
      transition: all .2s;
    }
    nav a:hover { background: rgba(255,255,255,.1); color: #fff; }
    nav a.active { background: #e94560; color: #fff; }

    .shell-content { flex: 1; padding: 24px; background: #f5f7fa; }

    .shell-footer {
      text-align: center;
      padding: 12px;
      font-size: 12px;
      color: #888;
      background: #fff;
      border-top: 1px solid #eee;
    }
  `],
})
export class AppComponent {}
