import { Injectable } from '@angular/core';
import { RegionService } from './core/region.service';
import { DntData } from './dnt-data';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators/map';
import { decompressFromUTF16 } from 'lz-string';
import { Observable } from 'rxjs/Observable';
import { LoadingService } from './core/loading/loading.service';

@Injectable()
export class DntService {

  loadedFiles: string[];
  constructor(
    private http: HttpClient,
    private regionService: RegionService,
    private loadingService: LoadingService) {
  }

  getData(file: string) {
    let observable = this.fetch(file);
    observable = this.loadingService.subscribe(file, observable);

    return observable.pipe(
      map(data => {
        return JSON.parse(decompressFromUTF16(data)) as DntData;
      }));
  }

  private fetch(file: string) {
    const url = this.regionService.region.url + '/' + file;
    return this.http.get(url, { responseType: 'text' });
  }
}
