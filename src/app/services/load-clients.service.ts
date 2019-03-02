import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class LoadClientsService {

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) { }

  loadClients() {
    console.log(this.config.api_url + '/client');
    return this.http.get(this.config.api_url + '/client');
  }

}
