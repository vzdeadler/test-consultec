import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CreateClientService {

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) { }

  createClient(data) {
    return this.http.post(
      this.config.api_url + '/client',
      {
        first_name: data.first_name,
        last_name: data.last_name,
        sex: data.sex,
        id: data.id,
        id_type: data.id_type,
        email: data.email,
        locality: data.locality,
        active: true
      }
    );
  }

}
