import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TrainerPokemonGameComponent } from '../components/trainer-pokemon-game/trainer-pokemon-game.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('TrainerPokemonGameComponent', () => {
  let component: TrainerPokemonGameComponent;
  let fixture: ComponentFixture<TrainerPokemonGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerPokemonGameComponent],
      providers: [ provideHttpClient(), provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => (key === 'gameId' ? '123' : null),
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainerPokemonGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have gameId as the page id', () => {
    expect(component.gameId).toBe('123');
  });
});
