import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Token } from '../../services/token.service';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

describe('Token', () => {
  let token: Token;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    (token = TestBed.inject(Token)),
      (httpMock = TestBed.inject(HttpTestingController));
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(token).toBeTruthy();
  });

});
