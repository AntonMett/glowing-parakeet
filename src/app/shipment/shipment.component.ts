import { Component } from '@angular/core';

import { Shipment } from './shipment.model';
import { ShipmentsService } from './shipments.service';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css']
})
export class ShipmentComponent {

  shipmentsArray: Shipment[] = [];

  columnsToDisplay: string[] = [
    'orderNo',
    'date',
    'customer',
    'trackingNo',
    'status',
    'consignee'
  ];

  constructor(private shipmentsService: ShipmentsService) { }


  onLoad() {
    this.shipmentsService.fetchShipments().subscribe(response => {
      this.shipmentsArray = response;
    })
  }

}