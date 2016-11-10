import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherService {
    private api_link: string;
    private images_weather_condition: Array<string>;
    private storage: any;

    constructor(public http: Http) {
        this.images_weather_condition = new Array<string>();

        this.storage = JSON.parse(localStorage.getItem('ionic-weather'));
        
        if (this.storage == null) {
            this.storage = {
                degrees_measure: "C",
                favorites: [],
            };
            this.updateStorage();
        }

        this.setAllImages();
    }

    setAllImages() {
        /** GET ALL POSSIBLE images_weather_condition OF WEATHER CONDITIONS */
        this.images_weather_condition['Mostly Cloudy'] = "https://ssl.gstatic.com/onebox/weather/128/partly_cloudy.png";
        this.images_weather_condition["Partly Cloudy"] = "https://ssl.gstatic.com/onebox/weather/128/partly_cloudy.png";
        this.images_weather_condition["Cloudy"] = "https://ssl.gstatic.com/onebox/weather/128/cloudy.png";
        this.images_weather_condition["Rain Light"] = "https://ssl.gstatic.com/onebox/weather/128/rain_light.png";
        this.images_weather_condition["Sunny"] = "https://ssl.gstatic.com/onebox/weather/128/sunny.png";
        this.images_weather_condition["Clear"] = "https://ssl.gstatic.com/onebox/weather/128/sunny.png";
        this.images_weather_condition["Mostly Clear"] = "https://ssl.gstatic.com/onebox/weather/128/partly_cloudy.png";
        this.images_weather_condition["Mostly Sunny"] = "https://ssl.gstatic.com/onebox/weather/128/partly_cloudy.png";
        this.images_weather_condition["Scattered Thunderstorms"] = "https://ssl.gstatic.com/onebox/weather/128/thunderstorms.png";
        this.images_weather_condition["Thunderstorms"] = "https://ssl.gstatic.com/onebox/weather/128/thunderstorms.png";
        this.images_weather_condition["Scattered Showers"] = "https://ssl.gstatic.com/onebox/weather/128/rain_light.png";
        this.images_weather_condition["Breezy"] = "https://ssl.gstatic.com/onebox/weather/128/windy.png";
        this.images_weather_condition["Windy"] = "https://ssl.gstatic.com/onebox/weather/128/windy.png";
        this.images_weather_condition["Snow Showers"] = "https://ssl.gstatic.com/onebox/weather/128/snow_light.png";
        this.images_weather_condition["Showers"] = "https://ssl.gstatic.com/onebox/weather/128/rain.png";
        this.images_weather_condition["Rain"] = "https://ssl.gstatic.com/onebox/weather/128/rain.png";
        this.images_weather_condition["Fog"] = "https://ssl.gstatic.com/onebox/weather/128/fog.png;"
    }

    setAPI(city: string): string {
        this.api_link = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' + city + '%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
        return this.api_link;
    }

    getWeather(city: string) {
        return this.http.get(this.setAPI(city))
            .map((response: Response) => response.json());
    }

    getImageWeatherCondition(condition: string): string {
        return this.images_weather_condition[condition];
    }

    addFavorite(place: string) {
        this.storage.favorites.push(place);
        this.updateStorage();
    }

    removeFavorite(place: string) {
        for (let i = 0; i < this.storage.favorites.length; i++) {
            if (this.storage.favorites[i] == place) {
                this.storage.favorites.splice(i, 1);
            }
        }
        this.updateStorage();
    }

    isFavorite(place: string): boolean {
        for (let i = 0; i < this.storage.favorites.length; i++) {
            if (this.storage.favorites[i] == place) {
                return true;
            }
        }

        return false;
    }

    getFavorites(): Array<string> {
        return this.storage.favorites;
    }

    getDegreesMeasure(){
        return this.storage.degrees_measure;
    }

    setDegreesMeasure(measure: string){
        this.storage.degrees_measure = measure;
        this.updateStorage();
    }

    updateStorage(){
        localStorage.setItem('ionic-weather', JSON.stringify(this.storage));
    }
}