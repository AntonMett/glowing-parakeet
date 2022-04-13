import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

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
  dummy: Shipment[] = [
    {
      "consignee": "Versartis, Inc.",
      "customer": "CVS Health Corporation",
      "date": "1/13/2019",
      "orderNo": "xa-274019-28781826-6392366",
      "status": "'In Transit'",
      "trackingNo": "TP-722240-39140415-6243705"
    },
    {
      "consignee": "Arconic Inc.",
      "customer": "Unilever PLC",
      "date": "5/18/2019",
      "orderNo": "zw-415596-40974807-0867175",
      "status": "'Delivered'",
      "trackingNo": "TP-816843-38193537-4809264"
    },
    {
      "consignee": "National Holdings Corporation",
      "customer": "Dover Motorsports, Inc.",
      "date": "2/1/2019",
      "orderNo": "ip-399949-44956033-6336288",
      "status": "'Delivered'",
      "trackingNo": "TP-036616-06520043-6024740"
    },
    {
      "consignee": "Aralez Pharmaceuticals Inc.",
      "customer": "Dorian LPG Ltd.",
      "date": "5/25/2019",
      "orderNo": "ih-479080-33007604-5022722",
      "status": "'In Transit'",
      "trackingNo": "TP-707824-71824223-4690032"
    }

  ]
  columnsToDisplay = ['orderNo', 'date', 'customer', 'trackingNo', 'status', 'consignee'];
  dataSource = new MatTableDataSource(this.shipmentsArray);

  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatTable) table = MatTable;

  constructor(private http: HttpClient, private changeDetection: ChangeDetectorRef) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort
  }

  onLoad() {
    this.getShipments()
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
        return responseArray;

      }))
      .subscribe(response => {
        console.log(response)
        this.shipmentsArray = response;
        this.changeDetection.detectChanges();
      })
  }
}