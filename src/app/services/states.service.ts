import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class StatesService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  public getStates() : Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/states/getRandomStates`);
  }
}
