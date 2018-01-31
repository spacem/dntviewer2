import { Component, OnInit, OnDestroy } from '@angular/core';
import { FileListService } from '../file-list.service';
import { DntService } from '../dnt.service';
import { ActivatedRoute } from '@angular/router';
import { DntData } from '../dnt-data';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid/main';
import { RegionService } from '../core/region.service';
import { CacheInterceptor } from '../cache.interceptor';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.scss']
})
export class FileViewComponent implements OnInit, OnDestroy {
  private subscription: any;
  private regionSubscription: any;
  private translateSubScription: any;
  private data: DntData;
  private gridApi: any;
  private gridColumnApi: any;

  textColumns = [
    'NameID',
    'DescriptionID',
    'JobName',
    'SubTitleNameID',
    'NameIDParam',
    'DescriptionIDParam',
    'TitleNameID',
    'TitleNameIDParam',
    'MapNameID',
    'Explanation',
    'ModeDescription',
    'SkillExplanationID',
  ];

  showOptions: boolean;
  rowData: any[] = null;
  columnDefs = [];
  gridOptions: GridOptions = {
    enableFilter: true,
    enableSorting: true,
    showToolPanel: false,
    enableColResize: true
  };

  constructor(
    private route: ActivatedRoute,
    private dntService: DntService,
    private regionService: RegionService,
    private translateService: TranslationService,
    private cacheInterceptor: CacheInterceptor) {
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
      this.subscription = null;
    }

    if (this.translateSubScription) {
      this.translateSubScription.unsubscribe();
      this.translateSubScription = null;
    }
    const fileName = this.route.snapshot.paramMap.get('fileName');
    this.subscription = this.dntService.getData(fileName).subscribe(data => {
      this.data = data;
      this.createColumns();
      this.createData();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }

    if (this.regionSubscription) {
      this.regionSubscription.unsubscribe();
      this.regionSubscription = null;
    }

    if (this.translateSubScription) {
      this.translateSubScription.unsubscribe();
      this.translateSubScription = null;
    }
  }

  createData() {
    if (!this.translateSubScription && this.columnDefs.find(c => c.status === 'text')) {
      this.translateSubScription = this.translateService.getTranslations().subscribe(() => {
        this.createDataAfterInit();
      });
    } else {
      this.createDataAfterInit();
    }
  }

  createDataAfterInit() {
    this.rowData = [];
    for (const r of this.data.data) {
      const row: any = {};
      for (const colName of Object.keys(this.data.columnIndexes)) {
        const colIndex = this.data.columnIndexes[colName];
        row[colName] = r[colIndex];
        if (this.columnDefs[colIndex].status === 'text') {
          row[colName] = this.translateService.simpleTranslate(row[colName]);
        }
      }
      this.rowData.push(row);
    }
  }

  createColumns() {
    this.columnDefs.splice(0, this.columnDefs.length);
    for (const c of this.data.columnNames) {
      const def: any = {
        headerName: c,
        field: c,
        status: 'normal'
      };

      if (this.textColumns.indexOf(c) !== -1) {
        def.status = 'text';
      }

      this.columnDefs.push(def);
    }
  }

  applyColumn(col: any) {
    this.gridColumnApi.setColumnVisible(col.field, (col.status !== 'hidden'));
    this.createData();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

}
