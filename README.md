# Angular Microfrontend POC

A production-ready Angular Microfrontend proof-of-concept powered by **Angular 22** and **@angular-architects/native-federation** (modern esbuild-based Module Federation).

---

## 🏛️ Architecture Overview

```
e:\micro\
├── shell/          ← Host Container (Port 4200)
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/event-bus.service.ts   ← Shared RxJS EventBus (Singleton)
│   │   │   ├── home/home.component.ts      ← Shell Home & Cross-MFE Event Monitor
│   │   │   ├── app.routes.ts               ← Dynamic Remote Module Routing
│   │   │   └── app.ts                      ← Global Nav Header & Layout
│   │   ├── bootstrap.ts
│   │   └── main.ts                         ← Initializes Federation via Manifest
│   ├── public/federation.manifest.json     ← Microfrontend Registry
│   ├── federation.config.mjs               ← Host Federation Config
│   └── angular.json
│
├── mfe-dashboard/  ← Remote 1: Dashboard (Port 4201)
│   ├── src/
│   │   ├── app/
│   │   │   ├── dashboard/                  ← KPIs, Revenue Chart, Activity Feed
│   │   │   │   ├── dashboard.component.ts
│   │   │   │   └── dashboard.routes.ts     ← Exposed via Federation ('./routes')
│   │   │   └── app.ts                      ← Standalone Mode Shell
│   │   ├── bootstrap.ts
│   │   └── main.ts
│   ├── federation.config.mjs               ← Exposes './routes'
│   └── angular.json
│
└── mfe-products/   ← Remote 2: Products (Port 4202)
    ├── src/
    │   ├── app/
    │   │   ├── products/                   ← Searchable Product Table & CRUD actions
    │   │   │   ├── product-list.component.ts
    │   │   │   └── products.routes.ts      ← Exposed via Federation ('./routes')
    │   │   └── app.ts                      ← Standalone Mode Shell
    │   ├── bootstrap.ts
    │   └── main.ts
    ├── federation.config.mjs               ← Exposes './routes'
    └── angular.json
```

---

## 🚀 How to Run

### Option 1: Start All Apps at Once (Windows)
```bash
npm run start:all
```
*This opens 3 command windows running `shell`, `mfe-dashboard`, and `mfe-products` concurrently.*

### Option 2: Start Individually
In 3 separate terminals:
```bash
# Terminal 1: Host Shell (Port 4200)
npm run start:shell

# Terminal 2: Dashboard Remote (Port 4201)
npm run start:mfe-dashboard

# Terminal 3: Products Remote (Port 4202)
npm run start:mfe-products
```

---

## 🌐 Endpoints

| Application | URL | Role |
| :--- | :--- | :--- |
| **Shell (Host)** | `http://localhost:4200` | Orchestrates remotes & provides navigation |
| **Shell → Dashboard** | `http://localhost:4200/dashboard` | Dynamically loads `mfe-dashboard` into Shell |
| **Shell → Products** | `http://localhost:4200/products` | Dynamically loads `mfe-products` into Shell |
| **mfe-dashboard (Standalone)** | `http://localhost:4201` | Runs independently for isolated dev & test |
| **mfe-products (Standalone)** | `http://localhost:4202` | Runs independently for isolated dev & test |

---

## 🔑 Key Architectural Decisions

1. **Native Federation (esbuild)**:
   - Uses Angular's native `@angular/build:application` builder with esbuild.
   - Browser-native ES Modules and Import Maps (`es-module-shims`).
   - Faster builds and rebuilds (~2.7s) without legacy Webpack overhead.

2. **Loose Coupling & Dynamic Routing**:
   - `shell` registers remotes via `public/federation.manifest.json`.
   - Routes use `loadRemoteModule('mfeDashboard', './routes')` for lazy loading on demand.

3. **Singleton Sharing**:
   - Angular core (`@angular/core`, `@angular/common`, `@angular/router`) is shared as singleton across host and remotes to prevent duplicate runtime instances.

4. **Cross-MFE Communication**:
   - Included `EventBusService` (`shell/src/app/core/event-bus.service.ts`) using RxJS Subject for cross-boundary messaging.
   - Home screen displays real-time event logs.

