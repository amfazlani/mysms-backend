import { Component, OnInit } from '@angular/core';
import { MessageService, Message } from '../../services/message.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-message-form',
  standalone: true,
  templateUrl: './message-form.component.html',
  imports: [CommonModule, FormsModule, MatSnackBarModule],
})
export class MessageFormComponent implements OnInit {
  message: Message = { to: '', body: '' };
  messages: Message[] = [];  // <-- add this

  constructor(private messageService: MessageService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getMessages().subscribe((msgs) => {
      this.messages = msgs;
    });
  }

  send() {
    this.messageService.sendMessage(this.message).subscribe({
      next: () => {
        this.snackBar.open('Message sent!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success'],
        });
        this.message = { to: '', body: '' };
        this.loadMessages();
      },
      error: (err) => {
        const errorMsg = err?.error?.errors?.[0] || 'Failed to send message';
        this.snackBar.open(errorMsg, 'Close', {
          duration: 5000,
          panelClass: ['snackbar-error'],
        });
      }
    });
  }
}
