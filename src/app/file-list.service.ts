import { Injectable } from '@angular/core';
import { RegionService } from './core/region.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FileListService {

  constructor(
    private http: HttpClient,
    private regionService: RegionService) {
  }

  getFiles() {
    const url = this.regionService.region.url + '/files.txt';
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(data => {
        return data.split('\n').map(f => f.trim());
      }));
  }
}
