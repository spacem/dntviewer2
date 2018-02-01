import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoadingServiceStub {
    isLoading() {
        return false;
    }

    hadError() {
        return false;
    }
}

@Injectable()
export class HttpClientStub {
    get() {
        return Observable.of();
    }
}

@Injectable()
export class RegionServiceStub {
    subject = new Subject();
}

@Injectable()
export class CacheInterceptorStub {
    loadedFiles: string[] = [];
    getLoadedFiles() {
        return this.loadedFiles;
    }
}
