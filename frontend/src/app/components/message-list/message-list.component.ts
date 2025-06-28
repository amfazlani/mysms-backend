import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService, Message } from '../../services/message.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

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
    private auth: AuthService
  ) {}

  ngOnInit() {
    // Track user login state
    const authSub = this.auth.currentUser$.subscribe(user => {
      if (user) {
        this.loadMessages();

        // Listen for message updates (from form submission)
        const updateSub = this.messageService.onMessagesUpdated().subscribe(() => {
          this.loadMessages();
        });

        this.subs.push(updateSub);
      } else {
        this.messages = [];
      }
    });

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
