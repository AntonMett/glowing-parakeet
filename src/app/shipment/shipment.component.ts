import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';

import { map } from 'rxjs'; // http observable operator

import { Shipment } from './shipment.model';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css']
})
export class ShipmentComponent implements OnInit, AfterViewInit {

  shipmentsArray: Shipment[] = [];
  columnsToDisplay = ['orderNo', 'date', 'customer', 'trackingNo', 'status', 'consignee'];
  dataSource = new MatTableDataSource(this.shipmentsArray);

  @ViewChild(MatSort) sort = new MatSort();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getShipments()
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort
  }


  private getShipments() {
    this.http
      .get<Shipment[]>('https://kuhne-nagel-default-rtdb.europe-west1.firebasedatabase.app/shipments.json')
      .pipe(map(responseData => {
        const responseArray = [];
        for (let key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            responseArray.push({ ...responseData[key] })
          }
        }
        console.log(this.dataSource);
        return responseArray;

      }))
      .subscribe(response => {
        this.shipmentsArray = response;
        console.log(this.shipmentsArray)
      })
  }
}