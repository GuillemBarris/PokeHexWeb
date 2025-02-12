import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonService } from '../services/pokemon.service';
import { of, throwError } from 'rxjs';
import { AdminPokemonComponent } from '../components/admin-pokemon/admin-pokemon.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AdminPokemonComponent', () => {
  let component: AdminPokemonComponent;
  let fixture: ComponentFixture<AdminPokemonComponent>;
  let spyObjectPokemonService: jasmine.SpyObj<PokemonService>;

  const mockResponse = {
    limit: 30,
    offset: 0,
    pokemons:[
    {
    attack: 92,
    category: "abomasnow",
    defense: 75,
    generation: 4,
    name: "abomasnow",
    ps: 90,
    spAttack: 92,
    spDefense: 85,
    speed: 60},
    {
    attack: 92,
    category: "abra",
    defense: 75,
    generation: 4,
    name: "abra",
    ps: 90,
    spAttack: 92,
    spDefense: 85,
    speed: 60}]
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
    spyObjectPokemonService = TestBed.inject(PokemonService) as jasmine.SpyObj<PokemonService>;

    spyObjectPokemonService.getPokemons.and.returnValue(of(mockResponse));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load pokemons with a different value of this.number', () => {

    spyObjectPokemonService.getPokemons.and.returnValue(of(mockResponse));

    component.ngOnInit();

    expect(spyObjectPokemonService.getPokemons).toHaveBeenCalledWith(0);
    expect(component.pokemons).toEqual(mockResponse.pokemons);
    expect(component.offset).toEqual(mockResponse.offset);
    expect(component.limit).toEqual(mockResponse.limit);
});
  it('should handle button click and number increment correctly', () => {
    const button = fixture.nativeElement.querySelectorAll('button')[1];
    
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
  
    spyObjectPokemonService.getPokemons.and.returnValue(of(mockEmptyResponse));
  
    const result = component.incrementNumber();
  
    expect(component.number).toBe(originalNumber); 
    expect(result).toBe(originalNumber); 
    expect(component.pokemons).toEqual([]); 
  });
  it('should handle error and revert number increment', () => {
    const originalNumber = component.number;
    const mockError = new Error('Failed to load Pokémon');
  
    spyObjectPokemonService.getPokemons.and.returnValue(throwError(() => mockError));
  
    const result = component.incrementNumber();
  
    expect(component.number).toBe(originalNumber); 
    expect(result).toBe(originalNumber);
    expect(component.pokemons).toEqual([]); 
  });
  
  it('should set errorMessage if getPokemons call fails or if no pokemons are returned', () => {
    const mockEmptyResponse = {
      pokemons: [],
      offset: 31,
      limit: 20
    };
  
    spyObjectPokemonService.getPokemons.and.returnValue(of(mockEmptyResponse));
  
    component.incrementNumber();
  
    expect(component.errorMessage).toBe('There are no more Pokémons to load.'); 
    expect(component.number).toBe(0);
    expect(component.pokemons).toEqual([]); 
  
    component.errorMessage = '';
    component.number = 0;
    component.pokemons = [];
  
    const mockError = new Error('Failed to load Pokémons.');
    spyObjectPokemonService.getPokemons.and.returnValue(throwError(() => mockError));
  
    component.incrementNumber();
  
    expect(component.errorMessage).toBe('Failed to load Pokémons.'); 
    expect(component.number).toBe(0); 
    expect(component.pokemons).toEqual([]); 
  });

  it('should handle button click and decrement correctly', () => {
    const button = fixture.nativeElement.querySelector('button')
    component.number = 31;
    button.dispatchEvent(new MouseEvent('click'));
 
    fixture.detectChanges();

    expect(component.number).toBe(0); 
  });

  it('should decrementNumber update pokemons, offset, and limit after getPokemons call', () => {
    component.number = 31;
    const result = component.decrementNumber();
     expect(component.pokemons).toEqual(mockResponse.pokemons);
     expect(component.offset).toBe(mockResponse.offset);
     expect(component.limit).toBe(mockResponse.limit);
     expect(result).toBe(0);
   });

   it('should revert number decremnet if no pokemons are returned', () => {

    const originalNumber = component.number;
    const mockEmptyResponse = {
      pokemons: [],
      offset: 0,
      limit: 31 
    };
  
    spyObjectPokemonService.getPokemons.and.returnValue(of(mockEmptyResponse));
  
    const result = component.decrementNumber();
  
    expect(component.number).toBe(originalNumber); 
    expect(result).toBe(originalNumber); 
    expect(component.pokemons).toEqual([]); 
  });

  it('should handle error and revert number decrement', () => {
    const originalNumber = component.number;
    const mockError = new Error('Failed to load Pokémon');
  
    spyObjectPokemonService.getPokemons.and.returnValue(throwError(() => mockError));
  
    const result = component.decrementNumber();
  
    expect(component.number).toBe(originalNumber); 
    expect(result).toBe(originalNumber);
    expect(component.pokemons).toEqual([]); 
  });
  it('should function decrementNumber set errorMessage if getPokemons call fails or if no pokemons are returned', () => {
    const mockEmptyResponse = {
      pokemons: [],
      offset: 31,
      limit: 20
    };
  
    spyObjectPokemonService.getPokemons.and.returnValue(of(mockEmptyResponse));
  
    component.decrementNumber();
  
    expect(component.errorMessage).toBe('There are no more Pokémons to load.'); 
    expect(component.number).toBe(0);
    expect(component.pokemons).toEqual([]); 
  
    component.errorMessage = '';
    component.number = 0;
    component.pokemons = [];
  
    const mockError = new Error('Failed to load Pokémons.');
    spyObjectPokemonService.getPokemons.and.returnValue(throwError(() => mockError));
  
    component.decrementNumber();
  
    expect(component.errorMessage).toBe('Failed to load Pokémons.'); 
    expect(component.number).toBe(0); 
    expect(component.pokemons).toEqual([]); 
  });
  
});
