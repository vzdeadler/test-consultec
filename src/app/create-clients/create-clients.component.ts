import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ClientDataService } from '../services/client-data.service';
import { CreateClientService } from '../services/create-client.service';
import { DialogComponent } from '../dialog/dialog.component';
import { EditClientService } from '../services/edit-client.service';

@Component({
  selector: 'app-create-clients',
  templateUrl: './create-clients.component.html',
  styleUrls: ['./create-clients.component.scss']
})
export class CreateClientsComponent implements OnInit {

  mode: string;
  txtMode: string;
  client: any;
  exitOnClose: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private clientDataService: ClientDataService,
    private CreateClientService: CreateClientService,
    private EditClientService: EditClientService
  ) { }

  openDialog(_msg, _title) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '50%',
      data: {
        title: _title,
        msg: _msg
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(this.exitOnClose)
        this.router.navigate(['/list_clients/']);
    });
  }

  ngOnInit() {
    this.mode = this.route.snapshot.paramMap.get('mode');
    this.exitOnClose = false;
    if(this.mode == 'edit'){
      this.client = this.clientDataService.getClientData();
      this.txtMode = 'Editar';
    }else{
      this.client = {
        first_name: '',
        last_name: '',
        sex: '',
        id_type: 'Nacionalidad',
        id: '',
        email: '',
        locality: ''
      };
      this.txtMode = 'Crear';
    }
    console.log(this.client);
    
  }

  createClient(){
    this.CreateClientService.createClient(this.client)
      .subscribe( (data) => {
        console.log('Success on POST ', data);
        let dialogMsg: string = 'El cliente ha sido creado con éxito.';
        this.openDialog(dialogMsg, 'Listo');
        this.exitOnClose = true;
    });
  }

  editClient(){
    this.EditClientService.editClient(this.client)
      .subscribe( (data) => {
        console.log('Success on PATCH ', data);
        let dialogMsg: string = 'El cliente ha sido editado con éxito.';
        this.openDialog(dialogMsg, 'Listo');
        this.exitOnClose = true;
    });
  }

  checkInputs() {
    let dialogMsg: string;
    let enable: boolean = false;
    if(!this.client.first_name){
      dialogMsg = 'Debe ingresar el nombre del cliente.';
    }else if(!this.client.last_name){
      dialogMsg = 'Debe ingresar el apellido del cliente.';
    }else if(!this.client.sex){
      dialogMsg = 'Debe seleccionar el sexo del cliente.';
    }else if(this.client.id_type == 'Nacionalidad'){
      dialogMsg = 'Debe seleccionar el tipo de cédula del cliente.';
    }else if(!this.client.id){
      dialogMsg = 'Debe introducir la cédula del cliente.';
    }else if(!this.client.locality){
      dialogMsg = 'Debe ingresar la localidad del cliente.';
    }else if(!this.client.email){
      dialogMsg = 'Debe ingresar el correo del cliente.';
    }else{
      enable = true;
    }
    if(!enable){
      this.openDialog(dialogMsg, 'Error');
    }else if(this.mode == 'create')
      this.createClient()
    else{
      this.editClient();
    }
  }

}
