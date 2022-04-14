import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';


import { Shipment } from './shipment.model';
import { ShipmentsService } from './shipments.service';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css']
})
export class ShipmentComponent {

  shipmentsArray: Shipment[] = [];
  loading: boolean = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  columnsToDisplay: string[] = [
    'orderNo',
    'date',
    'customer',
    'trackingNo',
    'status',
    'consignee',
    'button'
  ];

  constructor(private shipmentsService: ShipmentsService) { }

  onLoad() {
    this.loading = true;
    this.shipmentsService.fetchShipments().subscribe(response => {
      this.loading = false;
      this.shipmentsArray = response;
    })
  }


  onView(event: Event) {
    console.log(event)
  }


  sortData(sort: Sort) {
    const data = this.shipmentsArray.slice();
    console.log(sort)
    this.shipmentsArray = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'orderNo':
          return compare(a.orderNo, b.orderNo, isAsc);
        case 'consignee':
          return compare(a.consignee, b.consignee, isAsc);
        case 'customer':
          return compare(a.customer, b.customer, isAsc);
        case 'trackingNo':
          return compare(a.trackingNo, b.trackingNo, isAsc);
        case 'protein':
          return compare(a.status, b.status, isAsc);
        default:
          return 0;
      }
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}