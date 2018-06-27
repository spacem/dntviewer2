
import {of as observableOf,  Observable } from 'rxjs';

import {tap} from 'rxjs/operators';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

let cache = {};

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    clearCache() {
        cache = {};
    }

    getLoadedFiles() {
        console.log('getting loaded files');
        return Object.keys(cache).filter(f => f.indexOf('.json') > -1 && f.indexOf('uistring') === -1);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.method !== 'GET') {
            return next.handle(request);
        }
        const cachedResponse = cache[request.urlWithParams] || null;
        if (cachedResponse) {
            return observableOf(cachedResponse);
        }

        return next.handle(request).pipe(tap(event => {
            if (event instanceof HttpResponse) {
                cache[request.urlWithParams] = event;
            }
        }));
    }
}
