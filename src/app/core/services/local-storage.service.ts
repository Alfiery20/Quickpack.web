import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    const item: string | null = localStorage.getItem(key);
    if (item == null) return null;

    try {
      const p = JSON.parse(item);
      if (typeof p == 'object' && p !== null)
        return p;

      return item;
    }
    catch (e) {
      return item;
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
