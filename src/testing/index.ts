import { Injectable } from '@angular/core';
import { Observable , of, Subject } from 'rxjs';

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
        return of();
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
