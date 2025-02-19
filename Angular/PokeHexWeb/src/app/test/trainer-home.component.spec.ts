import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainerHomeComponent } from '../components/trainer-home/trainer-home.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { GameService } from '../services/game.service';
import { of, throwError } from 'rxjs';

describe('TrainerHomeComponent', () => {
  let component: TrainerHomeComponent;
  let fixture: ComponentFixture<TrainerHomeComponent>;
  let gameService: GameService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerHomeComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), GameService],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainerHomeComponent);
    component = fixture.componentInstance;
    gameService = TestBed.inject(GameService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the game correctly', () => {
    const mockGame = { id: '1', name: 'Pokemon', user_id: '1' };
    const mockResponse = { id: '1', name: 'Pokemon' };

    spyOn(gameService, 'putGame').and.returnValue(of(mockResponse));
    spyOn(console, 'log');
    spyOn(console, 'error');

    component.updateGame(mockGame);

    expect(gameService.putGame).toHaveBeenCalledWith(mockGame.id, mockGame);
    expect(console.log).toHaveBeenCalledWith('Game updated:', mockResponse);
    expect(console.error).not.toHaveBeenCalled();
  });
});