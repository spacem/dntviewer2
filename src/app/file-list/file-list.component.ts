import { Component, OnInit } from '@angular/core';
import { FileListService } from '../file-list.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subject } from 'rxjs/Subject';
import {
  debounceTime, distinctUntilChanged, map
} from 'rxjs/operators';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit, OnDestroy {
  allFiles: string[];
  files: string[];
  subscription: Subscription;

  constructor(private fileListService: FileListService) {
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
  }

  ngOnInit() {
    this.subscription = this.fileListService.getFiles().subscribe(files => {
      this.allFiles = files;
      this.filter('');
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
