import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { WeatherService } from './weather.service';
import { FavoritesModal } from '../favorites/favorites.modal';
import { SettingsModal } from '../settings/settings.modal';

@Component({
  selector: 'ionic-weather',
  templateUrl: 'weather.html',
  styles: [`
    .weather_container_degrees{
      margin: 0 auto;display: block;text-align: center
    }
    .weather_container_degrees h1{
        text-align: center; display: inline;opacity: 0.8;margin: 0 1em
    }
    .weather_container_degrees h5{
        text-align: center; display: inline;opacity: 0.7;
    }

    .weather_container_city span, h3 {
      text-align: center;display: block;margin-top: 0.2em
    }

    .weather_container_city img {
      margin: 0 auto; display: block
    }
    `],
  providers: [WeatherService]
})
export class WeatherPage implements OnInit {
  private weather_service: WeatherService;
  private desc: string;
  private weather_city: number;
  private weather_city_low: number;
  private weather_city_high: number;
  private condition: string;
  private city: string;
  private city_is_favorite: boolean;

  private images: Array<string>;
  private image_current_condition: string;

  private favorites: Array<string>;

  constructor(public modalCtrl: ModalController, public navParams: NavParams, public ws: WeatherService, public events: Events) {
    this.city_is_favorite = false;
    this.weather_service = ws;
    this.city = "";
    this.images = new Array();
  }

  ngOnInit() {
    /** Receive the city when the user selects it from favorites */
    this.events.subscribe('favorite:pressed', (userEventData) => {
      this.city = userEventData[0];
      this.search();
    });

    this.events.subscribe('measure:changed', (userEventData) => {
      this.ws.setDegreesMeasure(userEventData[0]);
      this.search();
    });
  }

  search() {
    if (this.city.length > 0) {
      this.weather_service.getWeather(this.city)
        .subscribe(weather => {
          if (weather.query.results !== null) {
            this.desc = weather.query.results.channel.location.city + ', ' + weather.query.results.channel.location.region + ', ' + weather.query.results.channel.location.country;

            if (this.weather_service.getDegreesMeasure() == "C") {
              this.weather_city = this.convertFtoC(weather.query.results.channel.item.condition.temp);
              this.weather_city_high = this.convertFtoC(weather.query.results.channel.item.forecast[0].high);
              this.weather_city_low = this.convertFtoC(weather.query.results.channel.item.forecast[0].low);
            } else {
              this.weather_city = weather.query.results.channel.item.condition.temp;
              this.weather_city_high = weather.query.results.channel.item.forecast[0].high;
              this.weather_city_low = weather.query.results.channel.item.forecast[0].low;
            }

            this.condition = weather.query.results.channel.item.condition.text;
            this.image_current_condition = this.weather_service.getImageWeatherCondition(this.condition);
            this.weather_service.isFavorite(this.desc) == true ? this.city_is_favorite = true : this.city_is_favorite = false;
          } else {
            this.desc = "";
            this.weather_city = undefined;
            this.weather_city_high = undefined;
            this.weather_city_low = undefined;
            this.condition = "";

            this.city_is_favorite = false;
            this.image_current_condition = "";
          }
        });
    } else {
      this.desc = "";
      this.weather_city = undefined;
      this.weather_city_high = undefined;
      this.weather_city_low = undefined;
      this.condition = "";

      this.city_is_favorite = false;
      this.image_current_condition = "";
    }
  }

  searchFromFavorite(cidade: string) {
    this.city = cidade;
    this.search();
  }

  favorite() {
    if (this.city_is_favorite) {
      this.city_is_favorite = false;
      this.weather_service.removeFavorite(this.desc);
    } else {
      this.city_is_favorite = true;
      this.weather_service.addFavorite(this.desc);
    }
  }

  convertFtoC(temp: number): number {
    let x = (temp - 32) * 5 / 9;
    return Math.round(x);
  }

  goToFavorites() {
    let modal = this.modalCtrl.create(FavoritesModal);
    modal.present();
  }

  goToSettings() {
    let modal = this.modalCtrl.create(SettingsModal);
    modal.present();
  }
}