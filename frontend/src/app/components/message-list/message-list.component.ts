import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // needed for *ngFor in template
import { MessageService, Message } from '../../services/message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  standalone: true,        // IMPORTANT! Marks this as standalone
  imports: [CommonModule]  // Import CommonModule for structural directives
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.getMessages().subscribe((data: Message[]) => {
      this.messages = data;
    });
  }
}
