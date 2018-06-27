import { ElementRef, Component, OnDestroy } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid';
import { DntData } from '../dnt-data';
import { SettingsService } from '../settings.service';

interface MyParams extends IHeaderParams {
  getDntData: () => DntData;
  getColumnStatuses: () => any;
  getColumnIndexes: () => any;
  saveStatuses: () => void;
}

@Component({
  templateUrl: 'grid-header.component.html',
  styleUrls: ['grid-header.component.scss']
})
export class GridHeaderComponent implements IHeaderAngularComp, OnDestroy {
  public params: MyParams;
  public sorted: string;
  private elementRef: ElementRef;

  constructor(
    elementRef: ElementRef) {
    this.elementRef = elementRef;
  }

  agInit(params: MyParams): void {
    this.params = params;
    this.params.column.addEventListener('sortChanged', this.onSortChanged.bind(this));
    this.onSortChanged();
  }

  ngOnDestroy() {
    console.log(`Destroying HeaderComponent`);
  }

  onMenuClick() {
    if (this.params) {
      this.params.showColumnMenu(this.querySelector('.btn'));
    }
  }

  onSortRequested(order, event) {
    if (this.params) {
      this.params.setSort(order, event.shiftKey);
    }
  }

  changeSort($event) {
    if (this.sorted === 'desc') {
      this.onSortRequested('', $event);
    } else if (this.sorted === 'asc') {
      this.onSortRequested('desc', $event);
    } else {
      this.onSortRequested('asc', $event);
    }
    this.onSortChanged();
  }

  onSortChanged() {
    if (this.params) {
      if (this.params.column.isSortAscending()) {
        this.sorted = 'asc';
      } else if (this.params.column.isSortDescending()) {
        this.sorted = 'desc';
      } else {
        this.sorted = '';
      }
    }
  }

  private querySelector(selector: string) {
    return <HTMLElement>this.elementRef.nativeElement.querySelector(
      '.btn', selector);
  }

  hideColumn() {
    if (this.params) {
      this.params.columnApi.setColumnVisible(this.params.column, false);
    }
  }

  isTranslateMode() {
    if (this.params) {
      const statuses = this.params.getColumnStatuses();
      const def = this.params.column.getColDef();
      return statuses[def.field] === 'text';
    }
  }

  translateColumn(shouldTranslate: boolean) {
    if (this.params) {
      const statuses = this.params.getColumnStatuses();
      const def = this.params.column.getColDef();
      if (shouldTranslate) {
        console.log('set status to text');
        statuses[def.field] = 'text';
      } else {
        statuses[def.field] = 'normal';
      }
      this.params.saveStatuses();
      this.params.api.refreshCells();
    }
  }

  isNumberColumn() {
    if (this.params) {
      const data = this.params.getDntData();
      const statuses = this.params.getColumnStatuses();
      const indexes = this.params.getColumnIndexes();
      const c = this.params.column.getColDef().field;
      const i = indexes[c];
      return c !== 'id' && data.columnTypes[i] !== 4 && data.columnTypes[i] !== 5;
    }
  }
}
