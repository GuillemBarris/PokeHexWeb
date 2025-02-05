import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonService } from '../services/pokemon.service';
import { of } from 'rxjs';
import { AdminPokemonComponent } from '../components/admin-pokemon/admin-pokemon.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AdminPokemonComponent', () => {
  let component: AdminPokemonComponent;
  let fixture: ComponentFixture<AdminPokemonComponent>;
  let pokemonService: jasmine.SpyObj<PokemonService>;

  const mockResponse = {
    pokemons: ['Pikachu', 'Charmander'],
    offset: 31,
    limit: 20
  };

  beforeEach(async () => {
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

    pokemonService.getPokemons.and.returnValue(of(mockResponse));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load pokemons with a different value of this.number', () => {
  

    const mockResponse = {
        pokemons: [{ name: 'Charmander' }, { name: 'Squirtle' }],
        offset: 0,
        limit: 31
    };

    pokemonService.getPokemons.and.returnValue(of(mockResponse));

    component.ngOnInit();

    expect(pokemonService.getPokemons).toHaveBeenCalledWith(0);
    expect(component.pokemons).toEqual(mockResponse.pokemons);
    expect(component.offset).toEqual(mockResponse.offset);
    expect(component.limit).toEqual(mockResponse.limit);
});
  it('should handle button click and number increment correctly', () => {
    const button = fixture.nativeElement.querySelector('button');
    
    button.dispatchEvent(new MouseEvent('click'));

    fixture.detectChanges();

    expect(component.number).toBe(31); 
  });
  it('should update pokemons, offset, and limit after getPokemons call', () => {
   const result = component.incrementNumber();
    expect(component.pokemons).toEqual(mockResponse.pokemons);
    expect(component.offset).toBe(mockResponse.offset);
    expect(component.limit).toBe(mockResponse.limit);
    expect(result).toBe(31);
  });
  
  it('should revert number increment if no pokemons are returned', () => {
    const originalNumber = component.number;
    const mockEmptyResponse = {
      pokemons: [],
      offset: 31,
      limit: 20
    };
  
    pokemonService.getPokemons.and.returnValue(of(mockEmptyResponse));
  
    const result = component.incrementNumber();
  
    expect(component.number).toBe(originalNumber); // El número debe revertirse
    expect(result).toBe(originalNumber); // El resultado debe ser el número original
    expect(component.pokemons).toEqual([]); // La lista de Pokémon debe estar vacía
  });
  
});
