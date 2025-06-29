// src/app/services/message.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';  // make sure the path is correct
import { HttpHeaders } from '@angular/common/http';
import { tap, catchError, map, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs'; // make sure this is also imported
import { environment } from '../../environments/environment';  // adjust path if needed

export interface Message {
  _id?: string;
  to: string;
  body: string;
  status?: string;
  created_at?: string;  // optional now
}

@Injectable({ providedIn: 'root' })
export class MessageService {
  private api = `${environment.API_BASE_URL}/api/messages`;
  private messageListUpdated = new Subject<void>(); // ✅ ADD THIS LINE

constructor(private http: HttpClient, private auth: AuthService) {}

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.api, message, {
      headers: this.authHeaders
    }).pipe(
      tap(() => this.messageListUpdated.next()) // 🔁 notify message-list
    );
  }

  get authHeaders(): HttpHeaders {
    return new HttpHeaders({
      'access-token': localStorage.getItem('access-token') || '',
      'client': localStorage.getItem('client') || '',
      'uid': localStorage.getItem('uid') || '',
    });
  }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.api, { headers: this.authHeaders });
  }

  onMessagesUpdated(): Observable<void> {
    return this.messageListUpdated.asObservable();
  }
}
