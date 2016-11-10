import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { WeatherService } from '../weather/weather.service';

@Component({
  templateUrl: 'favorites.html',
  providers: [WeatherService]
})
export class FavoritesModal {
  favorites: Array<string>;

  constructor(public viewCtrl: ViewController, public ws: WeatherService, public events: Events) {
    this.favorites = ws.getFavorites();
  }

  searchFromFavorite(location: string){
    this.events.publish('favorite:pressed', location);
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
