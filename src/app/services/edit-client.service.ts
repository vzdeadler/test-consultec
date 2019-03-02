import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class EditClientService {

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) { }

  editClient(data) {
    return this.http.patch(
      this.config.api_url + '/client/' + data._id,
      {
        first_name: data.first_name,
        last_name: data.last_name,
        sex: data.sex,
        id: data.id,
        id_type: data.id_type,
        email: data.email,
        locality: data.locality,
        active: data.active
      }
    );
  }

}
