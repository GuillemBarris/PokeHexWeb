import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerHomeComponent } from '../components/trainer-home/trainer-home.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('TrainerHomeComponent', () => {
  let component: TrainerHomeComponent;
  let fixture: ComponentFixture<TrainerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerHomeComponent],
      providers:[provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
