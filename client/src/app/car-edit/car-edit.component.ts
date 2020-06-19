import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CarService } from '../shared/car/car.service';
import { GiphyService } from '../shared/giphy/giphy.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit, OnDestroy {
  car: any = {};
  sub: Subscription;
  
  constructor(private route: ActivatedRoute,
              private router: Router,
              private carService: CarService,
              private giphyService: GiphyService) { }
  
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.carService.get(id).subscribe((car:any) => {
          if (car) {
            this.car = car;
            this.car.href = car._links.self.href;
            this.giphyService.get(car.name).subscribe(url => car.giphyService = url);
          } else {
            console.log(`Car with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  gotoList(){
    this.router.navigate(['/car-list']);
  }

  saveOrUpdate(form :NgForm){
    this.sub = this.route.params.subscribe( params => {
      const id = params.id;
      if(id){
        this.carService.uptdate(form, id).subscribe(result => {
          this.gotoList();
        });
      }else{
        this.carService.save(form).subscribe(result => {
          this.gotoList();
        }, error => console.error(error));
      }
    })
  }

  remove(){
    this.sub = this.route.params.subscribe(params => {
      const id = params.id;
      this.carService.remove(id).subscribe(result => {
        this.gotoList();
      }, error => console.log(error));
    })
  }

}
