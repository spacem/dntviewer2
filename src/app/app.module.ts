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
import { DntService } from './dnt.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { CacheInterceptor } from './cache.interceptor';
import { LoadingComponent } from './core/loading/loading.component';
import { LoadingService } from './core/loading/loading.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RegionComponent,
    HeaderComponent,
    NavComponent,
    FileListComponent,
    FileListComponent,
    FileViewComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    RegionService,
    FileListService,
    LoadingService,
    DntService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
