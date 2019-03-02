import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  api_url: string;

  constructor( ) {
    this.api_url = 'http://localhost:4000';
  }
}
