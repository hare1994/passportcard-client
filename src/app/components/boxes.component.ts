import { Component, OnInit } from '@angular/core';
import {Subscription, interval } from "rxjs";
import {HttpClient} from "@angular/common/http";

enum BoxesStates {
  KWS_KERIDOS = 'KWS_KERIDOS',
  KWS_KERIDOS_YG = 'KWS_KERIDOS_YG',
  UNKNOWN = 'UNKNOWN',
  ERROR = 'ERROR',
}

interface Box {
  id: number,
  state: BoxesStates,
  timestamp: number
}

@Component({
  selector: 'boxes-comp',
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.scss'],
})
export class BoxesComponent implements OnInit {
  public boxesStateEnum = BoxesStates;
  public boxes: Array<Box> = new Array<Box>();
  public subscription: Subscription = new Subscription();
  public boxesAsArray = Object.keys(this.boxesStateEnum);


  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.subscription = interval (500).subscribe((val) => this.initBoxes(val))
  }

  initBoxes(value: any) {
    if (value === 500) {
      this.subscription.unsubscribe();
      return;
    }

    this.http.get<any>('http://localhost:3000/states/getRandomStates').subscribe(data => {
      console.log("response from server", data.states);
      this.boxes = data.states;
    }, error => {
      this.subscription.unsubscribe();
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
