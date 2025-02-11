import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { GameService } from "../../services/game.service";
import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";

describe('DatabaseService', () => {
  let service: GameService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(GameService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get games by email using GET request', () => {
    const mockEmail = 'test@example.com';
    const mockResponse = [{ id: 1, name: 'Game 1', user_id: 'test@example.com'}, { id: 2, name: 'Game 2', user_id: 'test@example.com' }];

    service.getGames(mockEmail).subscribe(games => {
      expect(games).toEqual(mockResponse);
    });


    const req = httpMock.expectOne(`${service['Url']}/GetGameByUserId/${mockEmail}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

});