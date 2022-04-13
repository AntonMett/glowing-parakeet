import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Shipment } from "./shipment.model";


@Injectable({ providedIn: 'root' })


export class ShipmentsService {

  constructor(private http: HttpClient) {

  }

  fetchShipments() {
    return this.http
      .get<Shipment[][]>('https://kuhne-nagel-default-rtdb.europe-west1.firebasedatabase.app/shipments.json')
      .pipe(map(responseData => {
        const responseArray: Shipment[] = [];
        console.log(responseData)
        for (let key in responseData) {
          for (let k in responseData[key]) {
            responseArray.push(responseData[key][k])

          }

          ;
        };
        console.log(responseArray);
        return responseArray;
      })
      )
  };




}