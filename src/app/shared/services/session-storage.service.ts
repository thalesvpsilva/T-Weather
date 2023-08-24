import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  public setToken(token: string): void {
    this.setItem('access_token', btoa(token));
  }

  public getToken(): string | null {
    const token = this.getItem('access_token');
    if (!!!token) {
      return null;
    }
    return atob(token);
  }

  public delToken(): void {
    this.delItem('access_token');
  }

  public setItem(key: string, value: any): void {
    sessionStorage.setItem(key, value);
  }

  public getItem(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  public delItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  public clear(): void {
    sessionStorage.clear();
  }
}
