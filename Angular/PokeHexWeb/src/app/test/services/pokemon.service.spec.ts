import { TestBed } from "@angular/core/testing";
import { PokemonService } from "../../services/pokemon.service";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";

describe('DatabaseService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new pokemon', () => {
    const newPokemon = {
      name: 'name',
      generation: 1,
      category: 'category',
      ps: 100,
      attack: 100,
      defense: 100,
      spAttack: 100,
      spDefense: 100,
      speed: 100,
    };
    service.postPokemon(newPokemon).subscribe((response) => {
      expect(response).toEqual(newPokemon);
    });
    const req = httpMock.expectOne(`${service['Url']}/createPokemon/`);
    expect(req.request.method).toBe('POST');
  });
  it('should get all pokemons', () => {
    service.getPokemons().subscribe((response) => {
      expect(response).toEqual([]);
    });
    const req = httpMock.expectOne(`${service['Url']}/getPokemons/`);
    expect(req.request.method).toBe('GET');

  });
});