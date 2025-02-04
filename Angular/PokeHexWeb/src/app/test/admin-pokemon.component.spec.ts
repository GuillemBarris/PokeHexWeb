import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPokemonComponent } from '../components/admin-pokemon/admin-pokemon.component';
import { PokemonService } from '../services/pokemon.service';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

describe('AdminPokemonComponent', () => {
  let component: AdminPokemonComponent;
  let fixture: ComponentFixture<AdminPokemonComponent>;
  let pokemonService: jasmine.SpyObj<PokemonService>;

  const mockPokemons = [
    { name: 'Pikachu', generation: 1, category: 'Pikachu', ps: 35, attack: 55, defense: 40, spAttack: 50, spDefense: 50, speed: 90 },
    { name: 'Bulbasaur', generation: 1, category: 'Seed', ps: 45, attack: 49, defense: 49, spAttack: 65, spDefense: 65, speed: 45 },
  ];

  beforeEach(async () => {
    const pokemonServiceSpy = jasmine.createSpyObj('PokemonService', ['getPokemons']);

    await TestBed.configureTestingModule({
      imports: [AdminPokemonComponent],
      providers: [
        provideHttpClient(),
        { provide: PokemonService, useValue: pokemonServiceSpy } // Provide the mock service
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPokemonComponent);
    component = fixture.componentInstance;
    pokemonService = TestBed.inject(PokemonService) as jasmine.SpyObj<PokemonService>;
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
    spyOn(component, 'incrementNumber');
  
    const button = fixture.nativeElement.querySelector('button');
  
    button.dispatchEvent(new Event('dblclick'));

    expect(component.incrementNumber).toHaveBeenCalled();
  
    
    component.number = 5;

    component.incrementNumber();
  
    expect(component.number).toBe(36);
  });
});