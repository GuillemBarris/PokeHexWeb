import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { UserService } from '../../services/users.service';
import { TestBed } from '@angular/core/testing';

describe('DatabaseService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService, provideHttpClientTesting()],
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
    const req =httpMock.expectOne(`${service['Url']}/createUser`);
    expect(req.request.method).toBe('POST');
  });
});
