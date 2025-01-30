import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPokemonComponent } from '../components/admin-pokemon/admin-pokemon.component';
describe('AdminPokemonComponent', () => {
  let component: AdminPokemonComponent;
  let fixture: ComponentFixture<AdminPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPokemonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
