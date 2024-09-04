import { Component } from '@angular/core';
import { ClientService } from '../services/client.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
const clientState = {
  id: 0,
    firstName: '',
    middleName: '',
    lastName: '',
    secondLastName: '',
    contactNumber: '',
    email: '',
    dateOfBirth: new Date(),
    estimatedInsuranceValue: 0,
    notes: ''
  };

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent {

  public client = { ...clientState};
  constructor(private clientsServices: ClientService, private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    const clientId = this.route.snapshot.paramMap.get('clientId');
    console.log(clientId)
    if(clientId && clientId != '0' ){
      this.getClientInfo(parseInt(clientId || '0'))
    } 
  }

  getClientInfo(clientId: number) {
    this.clientsServices.getClientById(clientId).subscribe(response => {
      this.client = response as any
    })
  }

  registerClient() {
    this.clientsServices.createClient(this.client).subscribe(response => {
      this.client = {...clientState};
      this.router.navigate(['/client-list']);
    }, error => {
      alert('error register');
    });
  }

  isFormValid() {
    if (this.client.firstName == '' || this.client.lastName == '' || this.client.secondLastName == '' || this.client.contactNumber == '' || this.client.email == '' || this.client.estimatedInsuranceValue == 0) {
      return false
    }
    return true;
  }

  updateClient() {
    this.clientsServices.updateClient(this.client.id, this.client).subscribe(response => {
      this.client = {...clientState};
      this.router.navigate(['/client-list']);
    }, error => {
      alert('error register');
    });
  }

  onSubmit (){
    if( this.client.id) {
      this.updateClient()
    }
    else {
      this.registerClient()
    }
  }
};



