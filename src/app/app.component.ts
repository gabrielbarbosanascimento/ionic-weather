import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { enableProdMode } from '@angular/core';
import { WeatherPage } from '../pages/weather/weather';

enableProdMode();
@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = WeatherPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
    });
  }
}
