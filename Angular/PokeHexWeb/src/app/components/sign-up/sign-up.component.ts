import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  name: string = '';
  errorMessage: string | null = null;
  
  validateName():boolean {

    //Verifica que el nom no estigui buit
    if(!this.name){
      return false;
    }

    //Verifica que el nom no excedeixi a els 50 caracters
    if(/^\d+$/.test(this.name)){
      return false;
    }

    //Verifica que el nom no excedixi els 50 caracters
    if(this.name.length > 50){
      return false;
    }

    return true;
  }


}
