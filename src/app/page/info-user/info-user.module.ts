import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoUserPageRoutingModule } from './info-user-routing.module';

import { InfoUserPage } from './info-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoUserPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [InfoUserPage]
})
export class InfoUserPageModule { }
