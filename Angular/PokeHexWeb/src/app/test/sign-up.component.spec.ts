import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from '../components/sign-up/sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a form with name email, and password fields`, () => {
    const nameInput = fixture.nativeElement.querySelector('input[name="name"]');
    const emailInput = fixture.nativeElement.querySelector(
      'input[name="email"]'
    );
    const passwordInput = fixture.nativeElement.querySelector(
      'input[name="password"]'
    );
    expect(nameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('should validate name correctly', () => {
    component.name = 'Valid Name';
    expect(component.validateName()).toBeTrue();

    component.name = '1234';
    expect(component.validateName()).toBeFalse();

    component.name = '';
    expect(component.validateName()).toBeFalse();

    component.name = 'A'.repeat(51);
    expect(component.validateName()).toBeFalse();
  });

  it('should set errorMessage when name is invalid', () => {
    component.name = '';
    component.validateName();
    expect(component.errorMessage).toBe('Name cannot be empty');

    component.name = '1234';
    component.validateName();
    expect(component.errorMessage).toBe('Name cannot contain only numbers');

    component.name = 'A'.repeat(51);
    component.validateName();
    expect(component.errorMessage).toBe('Name cannot exceed 50 characters');
  });

});
