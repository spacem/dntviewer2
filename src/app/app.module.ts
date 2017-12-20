import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { RegionComponent } from './core/region/region.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { RegionService } from './core/region.service';
import { FileListService } from './file-list.service';
import { FileListComponent } from './file-list/file-list.component';
import { FileViewComponent } from './file-view/file-view.component';
import { AppRoutingModule } from './app-routing.module';
import {AgGridModule} from 'ag-grid-angular/main';

@NgModule({
  declarations: [
    AppComponent,
    RegionComponent,
    HeaderComponent,
    NavComponent,
    FileListComponent,
    FileListComponent,
    FileViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AgGridModule.withComponents([])
  ],
  providers: [RegionService, FileListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
