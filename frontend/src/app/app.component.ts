import { Component, OnInit } from '@angular/core';
import { MessageListComponent } from './components/message-list/message-list.component';
import { MessageFormComponent } from './components/message-form/message-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http'; // ✅ add this
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  // <-- import CommonModule here
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    MessageListComponent,
    MessageFormComponent,
  ],
})
export class AppComponent implements OnInit {
  user$!: Observable<any | null>;  // use any here to avoid missing User type error

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.restoreUser().subscribe(user => {
      this.user$ = this.auth.currentUser$;
    });
  }
}

