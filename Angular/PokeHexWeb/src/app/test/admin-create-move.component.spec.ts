import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateMoveComponent } from '../components/admin-create-move/admin-create-move.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('AdminCreateMoveComponent', () => {
  let component: AdminCreateMoveComponent;
  let fixture: ComponentFixture<AdminCreateMoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCreateMoveComponent],
      providers:[provideHttpClientTesting(), provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCreateMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
