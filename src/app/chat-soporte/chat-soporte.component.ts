import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-soporte',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './chat-soporte.component.html',
  styleUrl: './chat-soporte.component.css'
})
export class ChatSoporteComponent implements OnInit{


  @Output() close = new EventEmitter<void>();
  messages: { sender: string, content: string }[] = [];
  newMessage: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  cerrarChat() {
    this.close.emit();
  }

  enviarMensaje() {
    if (this.newMessage.trim() !== '') {
      this.messages.push({ sender: 'Tú', content: this.newMessage });
      this.newMessage = '';
    }
  }
}
