import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './components/home/home';
import { Navbar } from './components/navbar/navbar';
import { Abastecimento } from './components/abastecimento/abastecimento';
import { TabAbastecimentos } from './components/tab-abastecimentos/tab-abastecimentos';
import { TabPosto } from './components/tab-posto/tab-posto';
import { Posto } from './components/posto/posto';
import { Header } from './components/header/header';
import { NgbAlertModule, NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    App,
    Home,
    Navbar,
    Abastecimento,
    TabAbastecimentos,
    TabPosto,
    Posto,
    Header
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgbAlertModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    provideHttpClient()
  ],
  bootstrap: [App]
})
export class AppModule { }
