import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/car/car.service';
import { GiphyService } from '../shared/giphy/giphy.service';

@Component({
  selector: 'app-cool-list',
  templateUrl: './cool-list.component.html',
  styleUrls: ['./cool-list.component.css']
})
export class CoolListComponent implements OnInit {
  cars: Array<any>;

  constructor(private carService: CarService, private giphyService: GiphyService) { }

  ngOnInit(): void {
    this.carService.getCoolCars().subscribe(data => {
      this.cars =  data;
      for (const car of this.cars){
        this.giphyService.get(car.name).subscribe(url=>car.giphyUrl = url);
      }
    });
  }

}
