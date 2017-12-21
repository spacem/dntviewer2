import { Injectable } from '@angular/core';
import { RegionService } from './core/region.service';
import { DntData } from './dnt-data';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators/map';
import 'rxjs/add/observable/of';
import { decompressFromUTF16 } from 'lz-string';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DntService {

  constructor(
    private http: HttpClient,
    private regionService: RegionService) {
  }

  getData(file: string) {
    return this.fetch(file).pipe(
      map(data => {
        return JSON.parse(decompressFromUTF16(data)) as DntData;
      }));
  }

  private fetch(file: string) {
    const url = this.regionService.region.url + '/' + file;
    return this.http.get(url, { responseType: 'text' });
  }
}
