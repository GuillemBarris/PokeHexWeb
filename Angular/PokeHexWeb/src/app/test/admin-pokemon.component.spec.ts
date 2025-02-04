import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonService } from '../services/pokemon.service';
import { of } from 'rxjs';
import { AdminPokemonComponent } from '../components/admin-pokemon/admin-pokemon.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AdminPokemonComponent', () => {
  let component: AdminPokemonComponent;
  let fixture: ComponentFixture<AdminPokemonComponent>;
  let pokemonService: jasmine.SpyObj<PokemonService>;

  const mockPokemons = [
    { name: 'Pikachu', generation: 1, category: 'Pikachu', ps: 35, attack: 55, defense: 40, spAttack: 50, spDefense: 50, speed: 90 },
    { name: 'Bulbasaur', generation: 1, category: 'Seed', ps: 45, attack: 49, defense: 49, spAttack: 65, spDefense: 65, speed: 45 },
  ];

  beforeEach(async () => {
    // Create a spy for the PokemonService with getPokemons mocked
    const pokemonServiceSpy = jasmine.createSpyObj('PokemonService', ['getPokemons']);

    await TestBed.configureTestingModule({
      imports: [AdminPokemonComponent],
      providers: [
        { provide: PokemonService, useValue: pokemonServiceSpy },
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPokemonComponent);
    component = fixture.componentInstance;
    pokemonService = TestBed.inject(PokemonService) as jasmine.SpyObj<PokemonService>;

    // Mock the getPokemons method to return an observable of mockPokemons
    pokemonService.getPokemons.and.returnValue(of(mockPokemons));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load pokemon on init', () => {
    pokemonService.getPokemons.and.returnValue(of(mockPokemons));
    component.ngOnInit();

    expect(pokemonService.getPokemons).toHaveBeenCalled();

    expect(component.pokemons).toEqual(mockPokemons);
  });

  it('should handle button double-click and number increment correctly', () => {
    const button = fixture.nativeElement.querySelector('button');
    
    button.dispatchEvent(new MouseEvent('dblclick'));

    fixture.detectChanges();

    expect(component.number).toBe(31); 
  });
  
  
});
