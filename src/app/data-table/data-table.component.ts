import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DataTableDataSource } from './data-table-datasource';
import { Router } from '@angular/router';
import { MatTable } from '@angular/material';

import { ClientDataService } from '../services/client-data.service';
import { LoadClientsService } from '../services/load-clients.service';

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
    private loadClientsService: LoadClientsService,
    private router: Router
  ){ }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['first_name', 'last_name', 'id', 'sex', 'email', 'locality', 'actions'];

  ngOnInit() {
    // this.dataSource = new DataTableDataSource(this.paginator, this.sort);
    // this.dataSource.data = [];
    this.loadClientsService.loadClients()
      .subscribe( (data: any) => {
        this.dataSource = new MatTableDataSource(data.clients);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    
  }

  deleteSearch(){
    this.searchKey = '';
    this.applyFilter(this.searchKey);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(row){
    this.clientDataService.setClientData(row);
    this.router.navigate(['/create_clients/edit']);
  }


  // loadClientsData() {

  // }
}
