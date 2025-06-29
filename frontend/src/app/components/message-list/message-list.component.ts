import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService, Message } from '../../services/message.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { CableService } from '../../services/cable.service';  // adjust path if needed

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class MessageListComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  private subs: Subscription[] = [];

  constructor(
    private messageService: MessageService,
    private auth: AuthService,
    private cableService: CableService
  ) {}

ngOnInit() {
  const authSub = this.auth.currentUser$.subscribe(user => {
    if (user) {
      // Initial fetch
      this.messageService.getMessages().subscribe(msgs => {
        this.messages = msgs;
      });

      // Listen for local updates
      const updateSub = this.messageService.onMessagesUpdated().subscribe((msgs) => {
        this.messages = msgs;
      });

      // Listen for ActionCable updates
      const cableSub = this.cableService.onMessageStatusUpdate().subscribe(msg => {
        const index = this.messages.findIndex(m => m._id === msg.id);
        if (index !== -1) {
          this.messages[index].status = msg.status;
        }
      });

      // Push the subscriptions after defining them
      this.subs.push(updateSub, cableSub);
    } else {
      this.messages = [];
    }
  });

  // Now push authSub after it's defined
  this.subs.push(authSub);
}


  loadMessages() {
    this.messageService.getMessages().subscribe({
      next: (msgs) => this.messages = msgs,
      error: (err) => {
        console.error('Error loading messages:', err);
        this.messages = [];
      }
    });
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
