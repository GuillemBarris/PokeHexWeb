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
    expect(component.ValidPokemonName()).toBeFalse();

    component.pokemonName = 'Pik@chu';
    expect(component.ValidPokemonName()).toBeFalse();
    
    component.pokemonName = 'P'.repeat(15);
    expect(component.ValidPokemonName()).toBeFalse();   
  });


});
