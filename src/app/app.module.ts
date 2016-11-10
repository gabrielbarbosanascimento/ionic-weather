import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { WeatherPage } from '../pages/weather/weather';
import { FavoritesModal } from '../pages/favorites/favorites.modal';
import { SettingsModal } from '../pages/settings/settings.modal';

@NgModule({
  declarations: [
    MyApp,
    FavoritesModal,
    WeatherPage,
    SettingsModal
  ],
  imports: [
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FavoritesModal,
    WeatherPage,
    SettingsModal
  ],
  providers: []
})
export class AppModule {}
