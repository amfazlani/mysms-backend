import { Component } from '@angular/core';
import { MessageService, Message } from '../../services/message.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ import this

@Component({
  selector: 'app-message-form',
  standalone: true,
  templateUrl: './message-form.component.html',
  imports: [CommonModule, FormsModule],
})
export class MessageFormComponent {
  message: Message = { to: '', body: '' };

  constructor(private messageService: MessageService) {}

  send() {
    this.messageService.sendMessage(this.message).subscribe(() => {
      alert('Message sent!');
      this.message = { to: '', body: '' };
    });
  }

  ngOnInit() {
    console.log('MessageListComponent loaded');
  }
}
