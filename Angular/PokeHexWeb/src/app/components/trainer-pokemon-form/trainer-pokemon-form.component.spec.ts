import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerPokemonFormComponent } from './trainer-pokemon-form.component';

describe('TrainerPokemonFormComponent', () => {
  let component: TrainerPokemonFormComponent;
  let fixture: ComponentFixture<TrainerPokemonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerPokemonFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerPokemonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
