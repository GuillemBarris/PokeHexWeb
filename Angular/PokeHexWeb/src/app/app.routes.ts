import { Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { TrainerHomeComponent } from './components/trainer-home/trainer-home.component';
import { AdminCreatePokemonComponent } from './components/admin-create-pokemon/admin-create-pokemon.component';

export const routes: Routes = [{path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'sign-up', component: SignUpComponent},
    {path: 'login', component: LoginComponent},
    {path: 'admin-home', component: AdminHomeComponent},
    {path: 'trainer-home', component: TrainerHomeComponent},
    {path: 'admin-create-pokemon', component: AdminCreatePokemonComponent},
];
