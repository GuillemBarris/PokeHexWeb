import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { UserService } from '../../services/users.service';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

describe('DatabaseService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService, provideHttpClientTesting(), provideHttpClient()],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new user', () => {
    const newUser = {
      name: 'T',
      email: '@',
      type: 'Trainer',
      password: '123',
    };
    service.postUser(newUser).subscribe((response) => {
      expect(response).toEqual(newUser);
    });
    const req =httpMock.expectOne(`${service['Url']}/createUser/`);
    expect(req.request.method).toBe('POST');
  });

  it('should get a user by email and password', () => {
    
    const email = 'guillembarris@gmail.com';
    const password = 'G5m1i128!';
    const User = {
      name: 'Guillem Barris',
      email: 'guillembarris@gmail.com',
      type: 'Trainer',
    };

    service.getUserByEmailAndPassword(email, password).subscribe((response) => {
      expect(response).toEqual(User);
    });

    const req = httpMock.expectOne(`${service['Url']}/getUserByEmail/${email}/${password}`);
    expect(req.request.method).toBe('GET');
    
  });
});
