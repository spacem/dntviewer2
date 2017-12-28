import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEventType } from '@angular/common/http/src/response';

@Injectable()
export class LoadingService {

  loadingFiles: string[] = [];
  errors: string[] = [];

  constructor() {
  }

  isLoading() {
    return this.loadingFiles.length > 0 || this.errors.length > 0;
  }

  hadError() {
    return this.errors.length > 0;
  }

  clearErrors() {
    return this.errors = [];
  }

  getLoadingString() {
    if (this.errors.length) {
      return 'error: ' + this.errors.join(', ');
    } else {
      return 'loading files: ' + this.loadingFiles.join(', ');
    }
  }

  subscribe(fileName: string, observable: Observable<string>) {
    this.loadingFiles.push(fileName);
    const subscription = observable.subscribe(
      event => {
        this.loadingFiles = this.loadingFiles.filter(f => f !== fileName);
        if (subscription) {
          subscription.unsubscribe();
        }
      },
      error => {
        this.loadingFiles = this.loadingFiles.filter(f => f !== fileName);
        this.errors.push(error.message);
        if (subscription) {
          subscription.unsubscribe();
        }
      }
    );
  }


}
