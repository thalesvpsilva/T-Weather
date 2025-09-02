import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { HeaderComponent } from './header.component';
import { AuthService } from '../../services/auth.service';

describe('HeaderComponent Logged', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let mockAuthService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    mockAuthService = {
      isLoggedIn$: new BehaviorSubject(true),
      login: jest.fn(),
      logout: jest.fn(),
      checkLogin: jest.fn()
    } as any;
    
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
  });

  it('should create', () => {
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render clickable home button', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const homeButton = compiled.querySelector('a');
    expect(homeButton).toBeTruthy();
    expect(homeButton?.querySelector('img')?.className).toBe('');
  });

  it('should render logout button', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const logoutButton = compiled.querySelector('button.logout');
    expect(logoutButton).toBeTruthy();
  });
});

describe('HeaderComponent Logged In', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let mockAuthService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    mockAuthService = {
      isLoggedIn$: new BehaviorSubject(true),
      login: jest.fn(),
      logout: jest.fn(),
      isLoggedIn: jest.fn()
    } as any;
    
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
  });

  it('should create', () => {
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render clickable home button', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const homeButton = compiled.querySelector('a');
    expect(homeButton).toBeTruthy();
    expect(homeButton?.querySelector('img')?.className).toBe('');
  });

  it('should render logout button', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const logoutButton = compiled.querySelector('button.logout');
    expect(logoutButton).toBeTruthy();
  });
});

describe('HeaderComponent Logged Out', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let mockAuthService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    mockAuthService = {
      isLoggedIn$: new BehaviorSubject(false),
      login: jest.fn(),
      logout: jest.fn(),
      checkLogin: jest.fn()
    } as any;
    
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
  });

  it('should create', () => {
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render clickable home button with login-page class', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const homeButton = compiled.querySelector('a');
    expect(homeButton).toBeTruthy();
    expect(homeButton?.querySelector('img')?.className).toBe('login-page');
  });

  it('should not render logout button', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const logoutButton = compiled.querySelector('button.logout');
    expect(logoutButton).toBeFalsy();
  });
});
