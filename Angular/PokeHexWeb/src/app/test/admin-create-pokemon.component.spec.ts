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
    component.pokemonGeneration = 1;
    expect(component.validPokemonGeneration()).toBeTrue();

    component.pokemonGeneration = 0;
    expect(component.validPokemonGeneration()).toBeFalse();

    component.pokemonGeneration = '9'.repeat(2);
    expect(component.validPokemonGeneration()).toBeFalse();

    // Validate Pokemon category
    component.pokemonCategory = 'Electric';
    expect(component.validPokemonCategory()).toBeTrue();

    component.pokemonCategory = '';
    expect(component.validPokemonCategory()).toBeFalse();

    component.pokemonCategory = 'Electric'.repeat(26);
    expect(component.validPokemonCategory()).toBeFalse();

    component pokemonCategory = 'Electric!@';
    expect(component.validPokemonCategory()).toBeFalse();
    // Validate Pokemon Ps
    component.pokemonPs = 35;
   
    expect(component.validPokemonPs()).toBeTrue();

    component.pokemonPs = -1;
    expect(component.validPokemonPs()).toBeFalse();

    component.pokemonPS = 256;
    expect(component.validPokemonPs()).toBeFalse();

    //Validate Pokemon Attack

    component.pokemonAttack = 55;

    expect(component.validPokemonAttack()).toBeTrue();

    component.pokemonAttack = -1;
    expect(component.validPokemonAttack()).toBeFalse();

    component.pokemonAttack = 256;

    expect(component.validPokemonAttack()).toBeFalse();

    //Validate Pokemon Defense

    component.pokemonDefense = 40;

    expect(component.validPokemonDefense()).toBeTrue();

    component.pokemonDefense = -1;
    expect(component.validPokemonDefense()).toBeFalse();

    component.pokemonDefense = 256;

    expect(component.validPokemonDefense()).toBeFalse();

    //Validate Pokemon SpAttack

    component.pokemonSpAttack = 50;

    expect(component.validPokemonSpAttack()).toBeTrue();

    component.pokemonSpAttack = -1;
    expect(component.validPokemonSpAttack()).toBeFalse();

    component.pokemonSpAttack = 256;

    expect(component.validPokemonSpAttack()).toBeFalse();

    //Validate Pokemon SpDefense

    component.pokemonSpDefense = 50;

    expect(component.validPokemonSpDefense()).toBeTrue();

    component.pokemonSpDefense = -1;
    expect(component.validPokemonSpDefense()).toBeFalse();

    component.pokemonSpDefense = 256;

    expect(component.validPokemonSpDefense()).toBeFalse();

    //Validate Pokemon Speed

    component.pokemonSpeed = 90;

    expect(component.validPokemonSpeed()).toBeTrue();

    component.pokemonSpeed = -1;
    expect(component.validPokemonSpeed()).toBeFalse();

    component.pokemonSpeed = 256;

    expect(component.validPokemonSpeed()).toBeFalse();
  });
});
