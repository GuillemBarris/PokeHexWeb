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

    component.generation = '9'.repeat(2);
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
});
