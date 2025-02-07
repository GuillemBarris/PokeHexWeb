import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from '../../services/token.service';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {

  constructor(private router: Router, private token: Token) { }

  ngOnInit(){
    this.token.TokenPresent();
  }

  getToCreatePokemon() {
    this.router.navigate(['/admin-create-pokemon']);
  }
  getToViewAndEditPokemon() {
    this.router.navigate(['/admin-pokemon']);
  }

}
