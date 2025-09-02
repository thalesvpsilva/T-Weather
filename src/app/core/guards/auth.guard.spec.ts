import { TestBed } from '@angular/core/testing';
import { CanMatchFn, Route, Router, UrlSegment, UrlTree } from '@angular/router';

import { loggedInGuard, loggedOutGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('loggedInGuard', () => {
  const guard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loggedInGuard(...guardParameters));

  let router: Router;
  let mockAuthService: jest.Mocked<AuthService>;
  let mockRoute: jest.Mocked<Route>;
  let mockUrlSegment: jest.Mocked<UrlSegment[]>;

  beforeEach(() => {
    mockAuthService = {
      isLoggedIn: jest.fn().mockReturnValue(true)
    } as any;
    mockRoute = {} as any;
    mockUrlSegment = [{} as any];

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    });
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should confirm login', () => {
    const test = guard(mockRoute, mockUrlSegment);
    expect(guard(mockRoute, mockUrlSegment)).toBe(true);
  });

  it('should redirect to login page', () => {
    mockAuthService.isLoggedIn.mockReturnValue(false);
    expect(guard(mockRoute, mockUrlSegment)).toBeInstanceOf(UrlTree);
  });
});


describe('loggedOutGuard', () => {
  const guard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loggedOutGuard(...guardParameters));

  let router: Router;
  let mockAuthService: jest.Mocked<AuthService>;
  let mockRoute: jest.Mocked<Route>;
  let mockUrlSegment: jest.Mocked<UrlSegment[]>;

  beforeEach(() => {
    mockAuthService = {
      isLoggedIn: jest.fn().mockReturnValue(false)
    } as any;
    mockRoute = {} as any;
    mockUrlSegment = [{} as any];

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    });
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should confirm logout', () => {
    const test = guard(mockRoute, mockUrlSegment);
    expect(guard(mockRoute, mockUrlSegment)).toBe(true);
  });

  it('should redirect to main page', () => {
    mockAuthService.isLoggedIn.mockReturnValue(true);
    expect(guard(mockRoute, mockUrlSegment)).toBeInstanceOf(UrlTree);
  });
});