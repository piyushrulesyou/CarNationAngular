import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vehicle-cards',
  templateUrl: './vehicle-cards.component.html',
  styleUrls: ['./vehicle-cards.component.css']
})
export class VehicleCardsComponent implements OnInit {

  @Input('deliveryDate') deliveryDate: any;
  constructor() { }

  ngOnInit(): void {
  }

}
