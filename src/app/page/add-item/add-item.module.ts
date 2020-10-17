import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddItemPageRoutingModule } from './add-item-routing.module';

import { AddItemPage } from './add-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddItemPageRoutingModule
  ],
  declarations: [AddItemPage]
})
export class AddItemPageModule { }
