import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreatePokemonComponent } from '../components/admin-create-pokemon/admin-create-pokemon.component';

describe('AdminCreatePokemonComponent', () => {
  let component: AdminCreatePokemonComponent;
  let fixture: ComponentFixture<AdminCreatePokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCreatePokemonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCreatePokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should validate Pokemon name', () => {
    component.pokemonName = 'Pikachu';
    expect(component.pokemonName).toBe('Pikachu');

    component.pokemonName = '';
    expect(component.validPokemonName()).toBeFalse();

    component.pokemonName = 'Pik@chu';
    expect(component.validPokemonName()).toBeFalse();
    
    component.pokemonName = 'P'.repeat(16);
    expect(component.validPokemonName()).toBeFalse();   
  });

  it('should set errorMessage whenp pokemonName is invalid', () => {
    component.pokemonName = '';
    component.validPokemonName();
    expect(component.errorMessage).toBe('Worng Pokemon name. Pokemon name cannot be empty');

    component.pokemonName = 'Pik@chu';
    component.validPokemonName();
    expect(component.errorMessage).toBe('Worng Pokemon name. Pokemon name cannot contain special characters');

    component.pokemonName = 'P'.repeat(16);
    component.validPokemonName();
    expect(component.errorMessage).toBe('Worng Pokemon name. Pokemon name cannot be longer than 15 characters');
  });

  it('should validate Pokemon generation, category, and stats', () => {
    // Validate Pokemon generation
    component.generation = 1;
    expect(component.validPokemonGeneration()).toBeTrue();

    component.generation = 0;
    expect(component.validPokemonGeneration()).toBeFalse();

    component.generation =  Number("9".repeat(3));
    expect(component.validPokemonGeneration()).toBeFalse();

    // Validate Pokemon category
    component.category = 'Electric';
    expect(component.validPokemonCategory()).toBeTrue();

    component.category = '';
    expect(component.validPokemonCategory()).toBeFalse();

    component.category = 'Electric'.repeat(26);
    expect(component.validPokemonCategory()).toBeFalse();

    component.category = 'Electric!@';
    expect(component.validPokemonCategory()).toBeFalse();
    // Validate Pokemon Ps
    component.ps = 35;
   
    expect(component.validPokemonPs()).toBeTrue();

    component.ps = -1;
    expect(component.validPokemonPs()).toBeFalse();

    component.ps = 256;
    expect(component.validPokemonPs()).toBeFalse();

    //Validate Pokemon Attack

    component.attack = 55;

    expect(component.validPokemonAttack()).toBeTrue();

    component.attack = -1;
    expect(component.validPokemonAttack()).toBeFalse();

    component.attack = 256;

    expect(component.validPokemonAttack()).toBeFalse();

    //Validate Pokemon Defense

    component.defense = 40;

    expect(component.validPokemonDefense()).toBeTrue();

    component.defense = -1;
    expect(component.validPokemonDefense()).toBeFalse();

    component.defense = 256;

    expect(component.validPokemonDefense()).toBeFalse();

    //Validate Pokemon SpAttack

    component.spAttack = 50;

    expect(component.validPokemonSpAttack()).toBeTrue();

    component.spAttack= -1;
    expect(component.validPokemonSpAttack()).toBeFalse();

    component.spAttack = 256;

    expect(component.validPokemonSpAttack()).toBeFalse();

    //Validate Pokemon SpDefense

    component.spDefense = 50;

    expect(component.validPokemonSpDefense()).toBeTrue();

    component.spDefense = -1;
    expect(component.validPokemonSpDefense()).toBeFalse();

    component.spDefense = 256;

    expect(component.validPokemonSpDefense()).toBeFalse();

    //Validate Pokemon Speed

    component.speed = 90;

    expect(component.validPokemonSpeed()).toBeTrue();

    component.speed = -1;
    expect(component.validPokemonSpeed()).toBeFalse();

    component.speed = 256;

    expect(component.validPokemonSpeed()).toBeFalse();
  });

  it('should set errorMessage when Pokemon generation, category, and stats are invalid', () => {
    // Set errorMessage when Pokemon generation is invalid
    component.generation = 0;
    component.validPokemonGeneration();
    expect(component.errorMessage).toBe('Worng generation. Generation must be greater than 0');

    component.generation = Number("9".repeat(3));
    component.validPokemonGeneration();
    expect(component.errorMessage).toBe('Worng generation. Generation must be less than 1000');

    // Set errorMessage when Pokemon category is invalid
    component.category = '';
    component.validPokemonCategory();
    expect(component.errorMessage).toBe('Worng category. Category cannot be empty');

    component.category = 'Electric'.repeat(26);
    component.validPokemonCategory();
    expect(component.errorMessage).toBe('Worng category. Category cannot be longer than 25 characters');

    component.category = 'Electric!@';
    component.validPokemonCategory();
    expect(component.errorMessage).toBe('Worng category. Category can only contain letters and numbers');

    // Set errorMessage when Pokemon Ps is invalid
    component.ps = -1;
    component.validPokemonPs();
    expect(component.errorMessage).toBe('Worng Ps. Ps must be between 0 and 255');

    component.ps = 256;
    component.validPokemonPs();
    expect(component.errorMessage).toBe('Worng Ps. Ps must be between 0 and 255');

    // Set errorMessage when Pokemon Attack is invalid
    component.attack = -1;
    component.validPokemonAttack();
    expect(component.errorMessage).toBe('Worng Attack. Attack must be between 0 and 255');

    component.attack = 256;
    component.validPokemonAttack();
    expect(component.errorMessage).toBe('Worng Attack. Attack must be between 0 and 255');

    // Set errorMessage when Pokemon Defense is invalid
    component.defense = -1;
    component.validPokemonDefense();
    expect(component.errorMessage).toBe('Worng Defense. Defense must be between 0 and 255');

    component.defense = 256;
    component.validPokemonDefense();
    expect(component.errorMessage).toBe('Worng Defense. Defense must be between 0 and 255');

    // Set errorMessage when Pokemon SpAttack is invalid
    component.spAttack = -1;
    component.validPokemonSpAttack();
    expect(component.errorMessage).toBe('Worng SpAttack. SpAttack must be between 0 and 255');

    component.spAttack = 256;
    component.validPokemonSpAttack();
    expect(component.errorMessage).toBe('Worng SpAttack. SpAttack must be between 0 and 255');
  });

it('should call createPokemon when the button is double-clicked and all fields are valid', () => {
  spyOn(component, 'createPokemon');

  component.pokemonName = 'Pikachu';
  component.generation = 1;
  component.category = 'Electric';
  component.ps = 35;
  component.attack = 55;
  component.defense = 40;
  component.spAttack = 50;
  component.spDefense = 50;
  component.speed = 90;

  const button = fixture.debugElement.nativeElement.querySelector('button');
  button.dispatchEvent(new Event('dblclick'));

  expect(component.createPokemon).toHaveBeenCalled();
});
});
