import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-create-move',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-create-move.component.html',
  styleUrl: './admin-create-move.component.css'
})
export class AdminCreateMoveComponent {
  moveName: string = '';
}
