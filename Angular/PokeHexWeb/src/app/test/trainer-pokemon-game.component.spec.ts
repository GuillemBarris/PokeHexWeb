import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerPokemonGameComponent } from '../components/trainer-pokemon-game/trainer-pokemon-game.component';

describe('TrainerPokemonGameComponent', () => {
  let component: TrainerPokemonGameComponent;
  let fixture: ComponentFixture<TrainerPokemonGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerPokemonGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerPokemonGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
