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

  it('should validate email correctly', () => {
    component.email = 'a@gmail.com';
    expect(component.validateEmail()).toBeTrue();

    component.email = '';
    expect(component.validateEmail()).toBeFalse();

    component.email = 'a';
    expect(component.validateEmail()).toBeFalse();

    component.email = 'a@';

    expect(component.validateEmail()).toBeFalse();

    component.email = 'a@.';

    expect(component.validateEmail()).toBeFalse();

    component.email = 'a@.com';

    expect(component.validateEmail()).toBeFalse();

    component.email = 'A'.repeat(51);
    expect(component.validateEmail()).toBeFalse();

    component.email = 'a@gmail.com';
    expect(component.validateEmail()).toBeTrue();

    component.email = ' a@gmail.com ';
    expect(component.validateEmail()).toBeTrue();

    component.email = 'a.b@gmail.com';
    expect(component.validateEmail()).toBeTrue();

    component.email = 'a-b@gmail.com';
    expect(component.validateEmail()).toBeTrue();

    component.email = 'a@subdomain.gmail.com';
    expect(component.validateEmail()).toBeTrue();

    component.email = 'a+b@gmail.com';
    expect(component.validateEmail()).toBeTrue();

    component.email = 'a@!gmail.com';
    expect(component.validateEmail()).toBeFalse();
  });

  it('should set errorMessage when email is invalid', () => {
    component.email = '';
    component.validateEmail();
    expect(component.errorMessage).toBe('Email cannot be empty');

    component.email = 'a'.repeat(51);
    component.validateEmail();
    expect(component.errorMessage).toBe('Email cannot exceed 50 characters');

    component.email = 'a@!gmail.com';
    component.validateEmail();
    expect(component.errorMessage).toBe('Email format is invalid');
  });

  it('should validate password correctly', () => {
    component.password = 'ValidPass123!';
    expect(component.validatePassword()).toBeTrue();

    component.password = '';
    expect(component.validatePassword()).toBeFalse();

    component.password = 'short';
    expect(component.validatePassword()).toBeFalse();

    component.password = 'nouppercase123!';
    expect(component.validatePassword()).toBeFalse();

    component.password = 'NOLOWERCASE123!';
    expect(component.validatePassword()).toBeFalse();

    component.password = 'NoSpecialChar123';
    expect(component.validatePassword()).toBeFalse();

    component.password = 'NoNumber!';
    expect(component.validatePassword()).toBeFalse();

    component.password = 'a'.repeat(256);
    expect(component.validatePassword()).toBeFalse();
  });

  it('should se errorMessage when password is invalid', () => {
    component.password = '';
    component.validatePassword();
    expect(component.errorMessage).toBe('Password cannot be empty');

    component.password = 'short';
    component.validatePassword();
    expect(component.errorMessage).toBe('Password must be at least 8 characters');

    component.password = 'nouppercase123!';
    component.validatePassword();
    expect(component.errorMessage).toBe('Password must contain at least one uppercase letter');

    component.password = 'NOLOWERCASE123!';
    component.validatePassword();
    expect(component.errorMessage).toBe('Password must contain at least one lowercase letter');

    component.password = 'NoSpecialChar123';
    component.validatePassword();
    expect(component.errorMessage).toBe('Password must contain at least one special character');

    component.password = 'NoNumber!';
    component.validatePassword();
    expect(component.errorMessage).toBe('Password must contain at least one number');

    component.password = 'a'.repeat(256);
    component.validatePassword();
    expect(component.errorMessage).toBe('Password cannot exceed 255 characters');
  });

  it('should call createUser when the button is double-clicked and all fields are valid', () => {
    spyOn(component, 'createUser');

    component.name = 'Valid Name';
    component.email = 'valid.email@example.com';
    component.password = 'ValidPass123!';

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    const event = new MouseEvent('dblclick');
    button.dispatchEvent(event);

    expect(component.createUser).toHaveBeenCalled();
  });
  
});
