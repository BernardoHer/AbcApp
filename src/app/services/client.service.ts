import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../share/constans';
import { Observable } from 'rxjs';

export interface Client {
  id?: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  secondLastName: string;
  contactNumber: string;
  email: string;
  dateOfBirth: Date;
  estimatedInsuranceValue: number;
  notes?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  private apiUrl = API_URL + '/Clients'; 

  constructor(private http: HttpClient) { }

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  updateClient(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${id}`, client);
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }
}
