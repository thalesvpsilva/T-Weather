import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { lastValueFrom } from 'rxjs';

import { AuthService } from './auth.service';
import { SessionStorageService } from './../../shared/services/session-storage.service';
import { IAuthPayload } from './../../shared/contracts/auth/IAuthPayload';

describe('AuthService', () => {
  let service: AuthService;
  let router: Router;
  let mockStorageService: jest.Mocked<SessionStorageService>;

  const mockPayload: IAuthPayload = { user: 'admin', password: '123456' };
  mockStorageService = {
    getToken: jest.fn().mockReturnValue(''),
    clear: jest.fn(),
    setToken: jest.fn()
  } as any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SessionStorageService, useValue: mockStorageService }
      ]
    });
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login', async () => {
    await expect(
      lastValueFrom(service.login(mockPayload))
    ).resolves.toEqual(true);
  });

  it('should logout', async () => {
    const navigateSpy = jest.spyOn(router, 'navigateByUrl');

    service.logout();

    expect(navigateSpy).toHaveBeenCalledWith('/login');
  });

  it('should is logged out (false)', async () => {
    expect(service.isLoggedIn()).toEqual(false);
  });
});
