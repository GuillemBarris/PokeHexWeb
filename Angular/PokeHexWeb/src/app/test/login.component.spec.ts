import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from '../components/login/login.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../services/users.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let service: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [provideHttpClientTesting(), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    service = TestBed.inject(UserService);
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

  it('should se errorMessage when password is invalid in Login component', () => {
    component.password = '';
    component.validatePassword();
    expect(component.errorMessage).toBe('Worng password');

    component.password = 'short';
    component.validatePassword();
    expect(component.errorMessage).toBe('Worng password');

    component.password = 'nouppercase123!';
    component.validatePassword();
    expect(component.errorMessage).toBe('Worng password');

    component.password = 'NOLOWERCASE123!';
    component.validatePassword();
    expect(component.errorMessage).toBe('Worng password');

    component.password = 'NoSpecialChar123';
    component.validatePassword();
    expect(component.errorMessage).toBe('Worng password');

    component.password = 'NoNumber!';
    component.validatePassword();
    expect(component.errorMessage).toBe('Worng password');

    component.password = 'a'.repeat(256);
    component.validatePassword();
    expect(component.errorMessage).toBe('Worng password');
  });

  it('should call login when the button is double-clicked and all fields are valid', () => {
    spyOn(component, 'login');


    component.email = 'valid.email@example.com';
    component.password = 'ValidPass123!';

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    const event = new MouseEvent('dblclick');
    button.dispatchEvent(event);

    expect(component.login).toHaveBeenCalled();
  });

  it('should double click button Sign up go to sign up page', () => {
    spyOn(component, 'goToSignUp');
  
    fixture.detectChanges();
  
    const buttons = fixture.nativeElement.querySelectorAll('button');
    const signUpButton = buttons[1];
    const event = new MouseEvent('dblclick');
    signUpButton.dispatchEvent(event);
  
    expect(component.goToSignUp).toHaveBeenCalled();
  });

  it('should navigate to /sign-up when goToSignUp is called', () => {
    spyOn(router, 'navigate'); 
  
    const buttons = fixture.nativeElement.querySelectorAll('button');
    const signUpButton = buttons[1];
    const event = new MouseEvent('dblclick');
    signUpButton.dispatchEvent(event);
  
    fixture.detectChanges();
  
    expect(router.navigate).toHaveBeenCalledWith(['/sign-up']);
  });

  it('should call getUserByEmailAndPassword and navigate to /admin-home when email and password are valid and the user is an Admin', () => {
    spyOn(component, 'validateEmail').and.returnValue(true);
    spyOn(component, 'validatePassword').and.returnValue(true);
    spyOn(router, 'navigate');
  
    spyOn(service, 'getUserByEmailAndPassword').and.returnValue(
      of({ type: 'Admin' })
    ); 
  
    component.email = 'guillembarris@gmail.com';
    component.password = 'G5m1i128!';
    component.login();
  
    fixture.detectChanges();
  
    expect(component.validateEmail).toHaveBeenCalled();
    expect(component.validatePassword).toHaveBeenCalled();
    expect(service.getUserByEmailAndPassword).toHaveBeenCalledWith(
      component.email,
      component.password
    );
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/admin-home']);
  });
  it('should call getUserByEmailAndPassword and navigate to /trainer-home when email and password are valid and the user is an Trainer', () => {
    spyOn(component, 'validateEmail').and.returnValue(true);
    spyOn(component, 'validatePassword').and.returnValue(true);
    spyOn(router, 'navigate');
  
    spyOn(service, 'getUserByEmailAndPassword').and.returnValue(
      of({ type: 'Trainer' })
    ); 
  
    component.email = 'marti@gmail.com';
    component.password = 'G5m1i128!';
    component.login();
  
    fixture.detectChanges();
  
    expect(component.validateEmail).toHaveBeenCalled();
    expect(component.validatePassword).toHaveBeenCalled();
    expect(service.getUserByEmailAndPassword).toHaveBeenCalledWith(
      component.email,
      component.password
    );
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/trainer-home']);
  });
  
  
});
