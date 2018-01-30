import { Injectable } from '@angular/core';
import { RegionService } from './core/region.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { LoadingService } from './core/loading/loading.service';

const FILES_FILENAME = 'files.txt';

@Injectable()
export class FileListService {

  constructor(
    private http: HttpClient,
    private regionService: RegionService,
    private loadingService: LoadingService) {
  }

  getFiles() {
    let observable = this.getFileData();
    observable = this.loadingService.subscribe(FILES_FILENAME, observable);

    return observable.pipe(
      map(data => {
        return data.split('\n').map(f => f.trim());
      }));
  }

  getFileData() {
    const url = this.regionService.region.url + '/' + FILES_FILENAME;
    return this.http.get(url, { responseType: 'text' });
  }
}
