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



});
