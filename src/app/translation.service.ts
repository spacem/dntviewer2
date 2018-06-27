import { Injectable } from '@angular/core';
import { RegionService } from './core/region.service';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from './core/loading/loading.service';

@Injectable()
export class TranslationService {

  private data: any;
  constructor(
    private http: HttpClient,
    private regionService: RegionService,
    private loadingService: LoadingService) {
  }

  getTranslations() {
    const url = this.regionService.region.url + '/uistring.json';
    let observable;
    observable = this.http.get(url);
    observable = observable.pipe(tap(data => {
      this.setupData(data);
    }));

    observable = this.loadingService.subscribe('uistring.json', observable);
    return observable;
  }

  private setupData(data: any) {
    this.data = data;
  }

  fullTranslate(id: string, idParam: string) {
    if (this.data) {
      try {
        let name;
        if (!id) {
          return '';
        } else {
          name = this.simpleTranslate(id);

          if (typeof name !== 'string') {
            return 'm' + name;
          }
        }

        if (idParam && name) {
          if (typeof idParam === 'string') {
            const params = idParam.split(',');
            for (let p = 0; p < params.length; ++p) {
              let pid = params[p];
              if (pid.indexOf('{') === 0) {
                pid = params[p].replace(/\{|\}/g, '');
                pid = this.simpleTranslate(pid);
              }

              name = name.replace('{' + p + '}', pid);
            }
          } else {
            name = name.replace('{0}', idParam);
          }
        }

        return name;
      } catch (ex) {
        console.log('unable to translate', id, idParam, ex);
      }
    }

    return 'm' + id;
  }

  simpleTranslate(value: any) {
    if (!this.data) {
      return value;
    }
    let result = '';

    if (value === 0 || value === '' || value === null) {
      result = value;
    } else if (value.toString().indexOf(',') > -1 && value.toString().indexOf('{') > -1) {
      const values = value.toString().split(',');

      const results = [];
      for (let v = 0; v < values.length; ++v) {
        if (values[v].indexOf('{') === 0) {
          const stripped = values[v].replace('{', '').replace('}', '');
          results.push(values[v].replace(stripped, this.simpleTranslate(stripped)));
        } else {
          results.push(values[v]);
        }
      }

      result = results.join(',');
    } else {
      result = this.data[value];
      if (typeof result === 'undefined') {
        if (typeof value === 'string') {
          if (value.indexOf('{') === 0) {
            const stripped = value.replace('{', '').replace('}', '');
            result = value.replace(stripped, this.simpleTranslate(stripped));
          } else {
            result = value.toString();
          }
        } else {
          result = value;
        }
      } else if (typeof value === 'string' && result.indexOf('#N/A') === 0) {
        result = '';
      }
    }

    return result;
  }

}
