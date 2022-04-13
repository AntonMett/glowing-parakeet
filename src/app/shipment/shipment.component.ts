import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';


import { map } from 'rxjs'; // operator

import { MatSort, Sort } from '@angular/material/sort';


import { Shipment } from './shipment.model';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';


@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css']
})
export class ShipmentComponent implements OnInit, AfterViewInit {

  shipmentsArray: Shipment[] = [];

  //Dummy because there is a limit to API calls 
  shipmentsArraydummy: Shipment[] = [
    {
      orderNo: "321312312",
      date: "25/4/2022",
      customer: "mcdonalds",
      trackingNo: "312312312",
      status: "'Shipping'",
      consignee: "Royal Bank"
    },
    {
      orderNo: "912324654",
      date: "25/4/2022",
      customer: "doner",
      trackingNo: "8798797",
      status: "'Delivering'",
      consignee: "SantaFe"
    }
  ];


  columnsToDisplay = ['ORDERNO', 'DELIVERYDATE', 'CUSTOMER', 'TRACKINGNO', 'STATUS', 'CONSIGNEE'];
  dataSource = new MatTableDataSource(this.shipmentsArraydummy);

  @ViewChild(MatSort) sort = new MatSort();

  constructor(private http: HttpClient, private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
    this.getShipments()
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }


  private getShipments() {
    this.http
      .get<Shipment[]>('https://my.api.mockaroo.com/shipments.json?key=5e0b62d0')
      .pipe(map(responseData => {
        for (let key in responseData) {
          this.shipmentsArray.push(responseData[key])
        }
        return this.shipmentsArray
      }))
      .subscribe(response => console.log(response))
  }
}
