import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateMoveComponent } from '../components/admin-create-move/admin-create-move.component';

describe('AdminCreateMoveComponent', () => {
  let component: AdminCreateMoveComponent;
  let fixture: ComponentFixture<AdminCreateMoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCreateMoveComponent]
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
