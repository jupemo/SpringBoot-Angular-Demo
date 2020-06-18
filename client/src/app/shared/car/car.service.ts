import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class CarService {
  public API = '//localhost:8080';
  public CAR_API = this.API + '/cars';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.CAR_API);
  }

  getCoolCars(): Observable<any> {
    console.log(this.http.get(this.API + '/cars'))
    return this.http.get(this.API + '/cool-cars');
  }

  get(id: string){
    return this.http.get(this.CAR_API + '/' + id);
  }

  save(car: any): Observable<any>{
    let result : Observable<any>;
    result = this.http.post(this.API + "/add-car", car);
    return result;
  }

  remove(href: string){
    return this.http.delete(href);
  }

}
