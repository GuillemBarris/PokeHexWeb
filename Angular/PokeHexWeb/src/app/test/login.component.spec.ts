import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from '../components/login/login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate email correctly in Login component', () => {
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

  it('should set errorMessage when email is invalid in Login component', () => {
    component.email = '';
    component.validateEmail();
    expect(component.errorMessage).toBe('Worng email');

    component.email = 'a'.repeat(51);
    component.validateEmail();
    expect(component.errorMessage).toBe('Worng email');

    component.email = 'a@!gmail.com';
    component.validateEmail();
    expect(component.errorMessage).toBe('Worng email');
  });

  it('should validate password correctly in Login component', () => {
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
});
