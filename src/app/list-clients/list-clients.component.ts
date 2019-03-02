import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss']
})
export class ListClientsComponent implements OnInit {

  // clients = [
  //   { firstName: 'Juan', lastName: 'Figueira', email: 'Juan@gmail.com' }
  // ]

  // columnsToDisplay = ['Nombre', 'Apellido', 'Correo electrónico'];

  constructor() { }

  ngOnInit() {
  }

  edit(asd){
    console.log(asd);
  }

}
