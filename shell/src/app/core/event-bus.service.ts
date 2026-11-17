import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface BusEvent {
  type: string;
  payload?: unknown;
}

/**
 * Shared EventBusService — acts as a lightweight message broker
 * between the Shell and all remote MFEs.
 * Provided in root so Angular's singleton DI gives every MFE
 * the same instance (requires shared: singleton in MF config).
 */
@Injectable({ providedIn: 'root' })
export class EventBusService {
  private bus$ = new Subject<BusEvent>();

  /** Emit an event to all subscribers */
  emit(event: BusEvent): void {
    this.bus$.next(event);
  }

  /** Subscribe to events of a specific type */
  on(type: string): Observable<BusEvent> {
    return this.bus$.asObservable().pipe(
      filter((e) => e.type === type)
    );
  }

  /** Subscribe to all events (for debugging / logging) */
  all(): Observable<BusEvent> {
    return this.bus$.asObservable();
  }
}

