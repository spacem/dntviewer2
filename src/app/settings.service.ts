import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {

  filters: any = {};
  columnStatuses: any = {};
  constructor() { }

  saveFilterModel(fileName: string, filterModel) {
    this.filters[fileName] = filterModel;
  }

  getFilterModel(fileName: string) {
    return this.filters[fileName];
  }

  saveColumnStatuses(fileName: string, columnStatuses) {
    this.columnStatuses[fileName] = columnStatuses;
  }

  getColumnStatuses(fileName: string) {
    return this.columnStatuses[fileName];
  }
}
