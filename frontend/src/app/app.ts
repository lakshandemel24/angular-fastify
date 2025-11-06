import { Component, signal } from '@angular/core';
import { Api } from './services/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'My Fullstack App';
  message = signal<string>('');
  loading = signal<boolean>(false);
  users = signal<any[]>([]);

  constructor(private apiService: Api) {}

  ngOnInit() {
    this.fetchMessage();
    this.fetchUsers();
  }

  fetchMessage() {
    this.loading.set(true);
    this.apiService.getMessage().subscribe({
      next: (data) => {
        this.message.set(data.message);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error fetching message:', error);
        this.loading.set(false);
      }
    });
  }

  fetchUsers() {
    this.apiService.getUsers().subscribe({
      next: (data) => {
        this.users.set(data);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }
}
