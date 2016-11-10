import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { WeatherService } from '../weather/weather.service';

@Component({
    templateUrl: './settings.html',
    providers: [WeatherService]
})
export class SettingsModal {
    private degress_measure: string;
    private celcius: string;
    private fahrenheit: string;

    constructor(public viewCtrl: ViewController, public events: Events, public ws: WeatherService) {
        this.celcius = "C";
        this.fahrenheit = "F";
        this.degress_measure = ws.getDegreesMeasure();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    click(radio: string) {
        this.events.publish('measure:changed', radio);
        this.degress_measure = radio;
        this.dismiss();
    }
}