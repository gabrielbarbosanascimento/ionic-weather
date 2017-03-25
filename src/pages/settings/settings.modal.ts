import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { WeatherService } from '../weather/weather.service';

@Component({
    templateUrl: './settings.html',
    providers: [WeatherService]
})
export class SettingsModal {
    public degress_measure: string;

    constructor(public viewCtrl: ViewController, public events: Events, public ws: WeatherService) {
        this.degress_measure = ws.getDegreesMeasure();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    /** Change the unit preference */
    click(radio: string) {
        if (this.degress_measure != radio) {
            this.events.publish('measure:changed', radio);
            this.degress_measure = radio;
        }
        this.dismiss();
    }
}