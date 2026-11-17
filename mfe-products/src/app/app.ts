import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="mfe-header">
      <span>🛍️ Products MFE — <small>standalone app on port 4202</small></span>
      <nav>
        <a routerLink="/products" routerLinkActive="active">Products</a>
      </nav>
    </header>
    <main style="padding:24px"><router-outlet /></main>
  `,
  styles: [`.mfe-header{display:flex;justify-content:space-between;align-items:center;padding:0 20px;height:50px;background:#064e3b;color:#6ee7b7;font-size:14px} nav a{color:#ccc;text-decoration:none;padding:4px 12px;border-radius:12px} nav a.active{background:#e94560;color:#fff}`],
})
export class AppComponent {}
