import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  name: string = '';
  errorMessage: string | null = null;
  
  validateName():boolean {

    //Verifica que el nom no estigui buit
    if(!this.name){
      this.errorMessage = 'Name cannot be empty';
      return false;
    }

    //Verifica que el nom no excedeixi a els 50 caracters
    if(/^\d+$/.test(this.name)){
      this.errorMessage = 'Name cannot contain only numbers';
      return false;
    }

    //Verifica que el nom no excedixi els 50 caracters
    if(this.name.length > 50){
      this.errorMessage = 'Name cannot exceed 50 characters';
      return false;
    }

    return true;
  }


}
