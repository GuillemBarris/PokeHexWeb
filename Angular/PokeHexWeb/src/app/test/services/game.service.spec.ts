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
});