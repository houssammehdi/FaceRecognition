import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { TableComponent } from './table/table.component';
import { DetectComponent } from './detect/detect.component';
import { RectangleComponent } from './rectangle/rectangle.component';
import { AboutComponent } from './about/about.component';
import { IdentifyComponent } from './identify/identify.component';
import { TrainComponent } from './train/train.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    DetectComponent,
    RectangleComponent,
    AboutComponent,
    IdentifyComponent,
    TrainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
