import { Component, OnInit } from '@angular/core';
import {Subscription, interval } from "rxjs";
import {StatesService} from "../services/states.service";

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


  constructor(public statesService : StatesService) {

  }

  ngOnInit() {
    this.subscription = interval (500).subscribe((val) => this.initBoxes(val))
  }

  initBoxes(value: any) {
    if (value === 500) {
      this.subscription.unsubscribe();
      return;
    }

   this.statesService.getStates().subscribe(data => {
      console.log("response from server", data.states);
      if (data.states.length === data.maxStatesNumber) { // first time we randomize / after randomize all have changed
        this.boxes = data.states;
      } else { // update only the values of the boxes that were changed
        data.states.forEach((state: Box) => {
          this.boxes[state.id] = state;
        })
      }

    }, error => {
      this.subscription.unsubscribe();
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
