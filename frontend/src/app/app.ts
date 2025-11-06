import { Component } from '@angular/core';
import {Api} from './services/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'My Fullstack App';
  message = '';
  users: any[] = [];
  loading = false;

  constructor(private apiService: Api) {}

  ngOnInit() {
    this.fetchMessage();
    this.fetchUsers();
  }

  fetchMessage() {
    this.loading = true;
    this.apiService.getMessage().subscribe({
      next: (data) => {
        this.message = data.message;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching message:', error);
        this.loading = false;
      }
    });
  }

  fetchUsers() {
    this.apiService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }
}
