import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomeComponent } from '../components/admin-home/admin-home.component';
import { Router } from '@angular/router';

describe('AdminHomeComponent', () => {
  let component: AdminHomeComponent;
  let fixture: ComponentFixture<AdminHomeComponent>;7
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to /admin-create-pokemon when goToCreatePokemon is called', () => {
    spyOn(router, 'navigate'); 
  
    const buttons = fixture.nativeElement.querySelectorAll('button');
    const loginButton = buttons[0];
    const event = new MouseEvent('dblclick');
    loginButton.dispatchEvent(event);
  
    fixture.detectChanges();
  
    expect(router.navigate).toHaveBeenCalledWith(['/admin-create-pokemon']);
  });
});
