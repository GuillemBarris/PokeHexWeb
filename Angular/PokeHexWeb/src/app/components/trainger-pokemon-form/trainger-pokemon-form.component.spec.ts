import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraingerPokemonFormComponent } from './trainger-pokemon-form.component';

describe('TraingerPokemonFormComponent', () => {
  let component: TraingerPokemonFormComponent;
  let fixture: ComponentFixture<TraingerPokemonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraingerPokemonFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraingerPokemonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
