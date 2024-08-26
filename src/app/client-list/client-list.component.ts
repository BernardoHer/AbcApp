import { Component } from '@angular/core';
import { Client, ClientService } from '../services/client.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent {

  clients: Client[] = [];
  clientId: number = 0;


  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.getclients();
  }

  getclients() {
    this.clientService.getClients().subscribe(data => {
      this.clients = data;
    });
  }

  findClient() {
    if (this.clientId) {
      this.clientService.getClientById(this.clientId).subscribe(data => {
        this.clientId = data.id || 0;
      });
    } else {
      this.getclients();
    }
  }

  deleteClient(id: number) {
    this.clientService.deleteClient(id).subscribe(() => {
      this.getclients();
    });
  }

  updateClient(client: Client) {
    if (this.clientId) {
      this.clientService.updateClient(this.clientId, client).subscribe(data => {
        this.updateClient
      })
    }
  }
}
