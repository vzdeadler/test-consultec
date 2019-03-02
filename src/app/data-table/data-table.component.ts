import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DataTableDataSource } from './data-table-datasource';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { MatTable } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

import { ClientDataService } from '../services/client-data.service';
import { LoadClientsService } from '../services/load-clients.service';
import { EditClientService } from '../services/edit-client.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  //dataSource: any[];
  dataSource: MatTableDataSource<any>;
  searchKey: string;

  constructor(
    private clientDataService: ClientDataService,
    private editClientService: EditClientService,
    private loadClientsService: LoadClientsService,
    private router: Router,
    private dialog: MatDialog,

  ){ }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['active', 'first_name', 'last_name', 'id', 'sex', 'email', 'locality', 'actions'];

  ngOnInit() {
    // this.dataSource = new DataTableDataSource(this.paginator, this.sort);
    // this.dataSource.data = [];
    this.loadClientsService.loadClients()
      .subscribe( (data: any) => {
        this.dataSource = new MatTableDataSource(data.clients);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(data);
      });

  
    
  }

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
      this.router.navigate(['/list_clients/']);
    });
  }

  deleteSearch(){
    this.searchKey = '';
    this.applyFilter(this.searchKey);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(row){
    row.active = false;
    this.editClientService.editClient(row)
      .subscribe( (data) => {
        console.log('Success on PATCH ', data);
        let dialogMsg: string = 'El cliente ha sido inactivado con éxito.';
        this.openDialog(dialogMsg, 'Listo');
    });
  }

  edit(row){
    this.clientDataService.setClientData(row);
    this.router.navigate(['/create_clients/edit']);
  }


  // loadClientsData() {

  // }
}
