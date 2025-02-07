import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Token } from '../../services/token.service';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

describe('Token', () => {
  let token: Token;
  let httpMock: HttpTestingController;
  let router: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    token = TestBed.inject(Token),
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router)
    
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(token).toBeTruthy();
  });

  it('should save the token to localStorage', () => {
    const mockData = { token: 'fake-token' };

    token.saveToken(mockData);

    expect(localStorage.getItem('authToken')).toBe('fake-token');
  });

  it('should navigate to login if authToken is not present', () => {
    spyOn(router, 'navigate');

    spyOn(localStorage, 'authToken').and.returnValue(null);

    token.TokenPresent();

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
});

  
});
