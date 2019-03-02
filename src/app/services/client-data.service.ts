import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientDataService {

  clientData = undefined;

  constructor() { }

  setClientData(data) {
    this.clientData = data;
  }

  getClientData() {
    return this.clientData;
  }

}
