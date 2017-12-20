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
  searchTerms = new Subject<string>();
  files: string[];
  files$: Observable<string[]>;
  subscription: Subscription;

  constructor(private fileListService: FileListService) {
  }

  filter(term: string) {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.subscription = this.fileListService.getFiles().subscribe(files => {
      this.files = files;
      this.filter('');
    });

    this.files$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map((term: string) => {
        const terms = term.toUpperCase().split(' ');
        return this.files.filter(f => {
          const file = f.toUpperCase();
          return terms.every(t => file.indexOf(t) > -1);
        });
      }),
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadFile() {
    // TODO
  }
}
