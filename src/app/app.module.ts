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

@NgModule({
  declarations: [
    AppComponent,
    RegionComponent,
    HeaderComponent,
    NavComponent,
    FileListComponent,
    FileListComponent
  ],
  imports: [
    BrowserModule, HttpClientModule
  ],
  providers: [RegionService, FileListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
