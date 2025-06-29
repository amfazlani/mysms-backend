import { Injectable } from '@angular/core';
import * as ActionCable from 'actioncable';
import { Subject, Observable } from 'rxjs';
import { Message } from './message.service'; // import your Message interface
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CableService {
  private cable: ActionCable.Cable;
  private subscription: any;
  private messageStatusSubject = new Subject<{ id: string; status: string }>();

  constructor() {
    const uid = localStorage.getItem('uid') || '';
    const token = localStorage.getItem('access-token') || '';
    const client = localStorage.getItem('client') || '';

    this.cable = ActionCable.createConsumer(
      `wss://${environment.API_BASE}/cable?uid=${uid}&access-token=${token}&client=${client}`
    );

    this.subscription = this.cable.subscriptions.create('MessagesChannel', {
      received: (data: any) => {
        // Expecting data with { id, status } to update message status
        this.messageStatusSubject.next({ id: data.id, status: data.status });
      }
    });
  }

  onMessageStatusUpdate(): Observable<{ id: string; status: string }> {
    return this.messageStatusSubject.asObservable();
  }
}
