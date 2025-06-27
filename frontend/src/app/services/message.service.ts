// src/app/services/message.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Message {
  _id?: string;
  to: string;
  body: string;
  status?: string;
  created_at?: string;  // optional now
}

@Injectable({ providedIn: 'root' })
export class MessageService {
  private api = 'http://localhost:3000/api/messages';

  constructor(private http: HttpClient) {}

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.api, message, { withCredentials: true });
  }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.api, { withCredentials: true });
  }
}
