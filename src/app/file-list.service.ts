import { Injectable } from '@angular/core';
import { RegionService } from './core/region.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class FileListService {

  private fileData: string;
  private lastRegion: string;

  constructor(
    private http: HttpClient,
    private regionService: RegionService) {
  }

  getFiles() {
    return this.getFileData().pipe(
      map(data => {
        this.fileData = data;
        this.lastRegion = this.regionService.region.region;
        return data.split('\n').map(f => f.trim());
      }));
  }

  getFileData() {
    // if (this.fileData && this.lastRegion === this.regionService.region.region) {
      // return Observable.of(this.fileData);
    // } else {
      const url = this.regionService.region.url + '/files.txt';
      return this.http.get(url, { responseType: 'text' });
    // }
  }
}
