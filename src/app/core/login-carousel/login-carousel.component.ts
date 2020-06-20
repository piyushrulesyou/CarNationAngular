import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-carousel',
  templateUrl: './login-carousel.component.html',
  styleUrls: ['./login-carousel.component.css']
})
export class LoginCarouselComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public carImages = [
    {
      image: 'car-1.jpg'
    },
    {
      image: 'car-2.jpg'
    },
    {
      image: 'car-3.jpg'
    },
    {
      image: 'car-4.jpg'
    },
    {
      image: 'car-5.jpg'
    }
  ];
}
