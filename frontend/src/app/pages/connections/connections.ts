import {Component, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Api} from '../../core/services/api';

@Component({
  selector: 'app-connections',
  imports: [
    FormsModule
  ],
  templateUrl: './connections.html',
  styleUrl: './connections.scss',
})
export class Connections {

  title = 'My Fullstack App';
  message = signal<string>('');
  name = signal<string>('');
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

  submit() {
    this.apiService.postUser(this.name()).subscribe({
      next: (data) => {
        if(data.success) {
          this.message.set("Nuovo utente: " + data.user.name + " id: " + data.user._id);
          this.fetchUsers();
        }
      },
      error: (error) => {
        console.error('Error setting user:', error);
      }
    })
  }

  deleteUser(user: any) {
    this.apiService.deleteUser(user._id).subscribe({
      next: (data) => {
        if(data.success) {
          this.message.set("Utente eliminato: " + user.name + " id: " + user._id);
          this.fetchUsers();
        }
      },
      error: (error) => {
        console.error('Error setting user:', error);
      }
    })
  }

}
