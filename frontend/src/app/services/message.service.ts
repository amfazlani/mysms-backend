// src/app/services/message.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { CableService } from './cable.service';
import { environment } from '../../environments/environment';

export interface Message {
  _id?: string;
  to: string;
  body: string;
  status?: string;
  created_at?: string;
}

@Injectable({ providedIn: 'root' })
export class MessageService {
  private api = `${environment.API_BASE_URL}/api/messages`;

  private messages: Message[] = [];
  private messageListUpdated = new Subject<Message[]>();

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private cable: CableService
  ) {
    this.cable.onMessageStatusUpdate().subscribe((update: { id: string; status: string }) => {
      this.updateMessageStatus(update);
    });
  }

  get authHeaders(): HttpHeaders {
    return new HttpHeaders({
      'access-token': localStorage.getItem('access-token') || '',
      'client': localStorage.getItem('client') || '',
      'uid': localStorage.getItem('uid') || '',
    });
  }

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.api, message, {
      headers: this.authHeaders
    }).pipe(
      tap((newMessage) => {
        this.messages.unshift(newMessage);
        this.messageListUpdated.next([...this.messages]);
      })
    );
  }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.api, { headers: this.authHeaders }).pipe(
      tap((msgs) => {
        this.messages = msgs;
        this.messageListUpdated.next([...this.messages]);
      })
    );
  }

  onMessagesUpdated(): Observable<Message[]> {
    return this.messageListUpdated.asObservable();
  }

  private updateMessageStatus(update: { id: string; status: string }) {
    const msgIndex = this.messages.findIndex(msg => msg._id === update.id);
    if (msgIndex > -1) {
      this.messages[msgIndex].status = update.status;
      this.messageListUpdated.next([...this.messages]);
    }
  }
}
