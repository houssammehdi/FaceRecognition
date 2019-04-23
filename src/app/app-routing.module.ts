import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DetectComponent } from './detect/detect.component';
import { IdentifyComponent } from './identify/identify.component';
import { AboutComponent } from './about/about.component';
import { TrainComponent } from './train/train.component';

const routes: Routes = [
  {path: 'detect', component: DetectComponent},
  {path: 'identify', component: IdentifyComponent},
  {path: 'about', component: AboutComponent},
  {path: 'train', component: TrainComponent},
  {path: '', component: DetectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
