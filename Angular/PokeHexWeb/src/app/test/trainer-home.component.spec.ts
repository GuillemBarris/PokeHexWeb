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


  it('should handle the error when updating the game', () => {
    const mockGame = { id: '1', name: 'Pokemon', user_id: '1' };
    const mockError = new Error('Error de red');

    spyOn(gameService, 'putGame').and.returnValue(throwError(mockError));
    spyOn(console, 'error');
    spyOn(console, 'log');

    component.updateGame(mockGame);

    expect(gameService.putGame).toHaveBeenCalledWith(mockGame.id, mockGame);
    expect(console.error).toHaveBeenCalledWith('Error updating the game:', mockError);
    expect(console.log).not.toHaveBeenCalled();
  });

  it('should show an error if the game ID is not defined', () => {
    const mockGame = { id: undefined, name: 'Super Mario', user_id: '1' };

    spyOn(console, 'error');
    spyOn(gameService, 'putGame');

    component.updateGame(mockGame);

    expect(console.error).toHaveBeenCalledWith('The game ID is not defined.');
    expect(gameService.putGame).not.toHaveBeenCalled();
  });
});