import { Component, OnInit, OnDestroy } from '@angular/core';
import { FileListService } from '../file-list.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {
  debounceTime, distinctUntilChanged, map
} from 'rxjs/operators';
import { RegionService } from '../core/region.service';
import { CacheInterceptor } from '../cache.interceptor';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit, OnDestroy {
  allFiles: string[] = [];
  allOpenFiles: string[] = [];
  files: string[] = [];
  openFiles: string[] = [];

  subscription: any;
  regionSubscription: any;
  searchTerm = '';

  constructor(
    private fileListService: FileListService,
    private regionService: RegionService,
    private cacheInterceptor: CacheInterceptor) {
  }

  filter(term: string) {
    if (!this.allFiles) {
      return;
    }

    const terms = term.toUpperCase().split(' ');
    this.files = this.allFiles.filter(f => {
      const file = f.toUpperCase();
      return terms.every(t => file.indexOf(t) > -1);
    });

    this.openFiles = this.allOpenFiles.filter(f => {
      const file = f.toUpperCase();
      return terms.every(t => file.indexOf(t) > -1);
    });
  }

  getOpenFiles() {
    return this.cacheInterceptor.getLoadedFiles().map(f => {
      const parts = f.split('/');
      return parts[parts.length - 1];
    });
  }

  ngOnInit() {
    this.init();
    this.regionSubscription = this.regionService.subject.subscribe(() => {
      this.cacheInterceptor.clearCache();
      this.init();
    });
  }

  init() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.fileListService.getFiles().subscribe(files => {
      this.allFiles = files;
      this.allOpenFiles = this.getOpenFiles();
      this.filter(this.searchTerm);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.regionSubscription) {
      this.regionSubscription.unsubscribe();
    }
  }
}
