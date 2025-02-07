import { Component } from '@angular/core';
import { Token } from '../../services/token.service';

@Component({
  selector: 'app-trainer-home',
  standalone: true,
  imports: [],
  templateUrl: './trainer-home.component.html',
  styleUrl: './trainer-home.component.css'
})
export class TrainerHomeComponent {

  constructor(private token: Token){}

    ngOnInit(){
      this.token.TokenPresent();
    }
}
