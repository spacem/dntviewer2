import { Component, OnInit, OnDestroy } from '@angular/core';
import { FileListService } from '../file-list.service';
import { DntService } from '../dnt.service';
import { ActivatedRoute } from '@angular/router';
import { DntData } from '../dnt-data';
import { ColumnApi, GridApi, GridOptions, IGetRowsParams, IDatasource, ColumnVisibleEvent } from 'ag-grid/main';
import { RegionService } from '../core/region.service';
import { CacheInterceptor } from '../cache.interceptor';
import { Observable ,  Subscription } from 'rxjs';
import { TranslationService } from '../translation.service';
import { SettingsService } from '../settings.service';
import { GridHeaderComponent } from '../grid-header/grid-header.component';

@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.scss']
})
export class FileViewComponent implements OnInit, OnDestroy, IDatasource {
  private subscription: any;
  private regionSubscription: any;
  private translateSubScription: any;
  private gridApi: GridApi;
  private gridColumnApi: any;
  private columnStatuses: any = {};
  private columnIndexes: any = {};
  private fileName: string;
  data: DntData;

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
    'CoreStatusNameID'
  ];

  showOptions: boolean;
  columnDefs = [];
  gridOptions: GridOptions = {
    enableFilter: true,
    enableSorting: true,
    showToolPanel: false,
    enableColResize: true,
    datasource: this,
    defaultColDef: {
      headerComponentFramework : <{new():GridHeaderComponent}>GridHeaderComponent,
      headerComponentParams : {
        getDntData: () => this.data,
        getColumnStatuses: () => this.columnStatuses,
        getColumnIndexes: () => this.columnIndexes,
        saveStatuses: () => this.settingsService.saveColumnStatuses(this.fileName, this.columnStatuses),
      }
    }
  };

  constructor(
    private route: ActivatedRoute,
    private dntService: DntService,
    private regionService: RegionService,
    private translateService: TranslationService,
    private cacheInterceptor: CacheInterceptor,
    private settingsService: SettingsService) {
  }

  ngOnInit() {
    this.init();
    this.regionSubscription = this.regionService.subject.subscribe(() => {
      this.cacheInterceptor.clearCache();
      this.init();
    });
  }

  init() {
    const startTime = new Date().getTime();
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }

    if (this.translateSubScription) {
      this.translateSubScription.unsubscribe();
      this.translateSubScription = null;
    }
    this.fileName = this.route.snapshot.paramMap.get('fileName');
    this.subscription = this.dntService.getData(this.fileName).subscribe(data => {
      this.data = data;
      this.createColumns();
      this.createData();

      if (this.data.data.length > 100000) {
        this.gridOptions.rowModelType = 'infinite';
        this.gridOptions.enableSorting = false;
      } else {
        this.gridOptions.rowData = this.data.data;
      }
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
    if (!this.translateSubScription && this.columnDefs.find(c => this.columnStatuses[c.field] === 'text')) {
      this.translateSubScription = this.translateService.getTranslations().subscribe(() => {
      });
    }
  }

  createColumns() {
    console.log('creating columns');
    this.columnDefs.splice(0, this.columnDefs.length);
    for (let i = 0; i < this.data.columnNames.length; ++i) {
      const c = this.data.columnNames[i];
      const def: any = {
        headerName: c,
        field: c,
        filter: 'number',
        filterParams: {
          newRowsAction: 'keep',
          defaultOption: 'equals',
          filterOptions: ['equals']
        },
        menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab']
      };

      this.columnIndexes[c] = i;

      if (this.data.columnTypes[c] === 1) {
        def.filter = 'text';
        def.filterParams.filterOptions.push('contains');
        def.filterParams.defaultOption = 'contains';
      }

      if (!this.columnStatuses[c]) {
        if (this.textColumns.indexOf(c) !== -1) {
          this.columnStatuses[c] = 'text';
        } else {
          this.columnStatuses[c] = 'normal';
        }
      }

      if (this.columnStatuses[c] === 'text' || this.data.columnTypes[i] === 1) {
        def.filter = 'text';
        def.filterParams.filterOptions.push('contains');
        def.filterParams.defaultOption = 'contains';
      }

      def.valueGetter = params => {
        let value;
        if (params.data) {
          const index = this.columnIndexes[params.colDef.field];
          value = params.data[index];
        }

        if (value && this.columnStatuses[c] === 'text') {
          return this.translateService.simpleTranslate(value);
        } else if (value && value.toFixed && (this.data.columnTypes[c] === 4 || this.data.columnTypes[c] === 5)) {
          let rounded = value.toFixed(4);
          while (rounded.length > 0 && rounded.lastIndexOf('0') === rounded.length - 1) {
            rounded = rounded.substr(0, rounded.length - 1);
          }
          return rounded;
        } else {
          return value;
        }
      };

      this.columnDefs.push(def);
    }
  }

  applyColumn(col: any) {
    this.settingsService.saveColumnStatuses(this.fileName, this.columnStatuses);
    this.gridColumnApi.setColumnVisible(col.field, (this.columnStatuses[col.field] !== 'hidden'));
    this.createData();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.refreshCells();

    this.restoreSettings();

    this.gridApi.addEventListener('columnVisible', (event: ColumnVisibleEvent) => {
      if (!event.visible) {
        this.columnStatuses[event.column.getColId()] = 'hidden';
        this.settingsService.saveColumnStatuses(this.fileName, this.columnStatuses);
      }
    });

    this.gridApi.addEventListener('filterChanged', () => {
      if (this.gridOptions.rowModelType === 'infinite') {
        this.gridApi.setDatasource(this);
      }
      this.settingsService.saveFilterModel(this.fileName, this.gridApi.getFilterModel());
    });
  }

  restoreSettings() {
    const filterModel = this.settingsService.getFilterModel(this.fileName);
    if (filterModel) {
      this.gridApi.setFilterModel(filterModel);
    }

    const columnStatuses = this.settingsService.getColumnStatuses(this.fileName);
    if (columnStatuses) {
      this.columnStatuses = columnStatuses;
      for (const col of this.columnDefs) {
        this.applyColumn(col);
      }
    }
  }

  getRows(params: IGetRowsParams) {
    let useData = this.data.data;
    if (params.filterModel) {
      for (const field of Object.keys(params.filterModel)) {
        const filter = params.filterModel[field];
        const index = this.columnIndexes[field];
        let lowerCaseFilter;
        if (filter.type === 'contains') {
          lowerCaseFilter = filter.filter.toLowerCase();
        }
        useData = useData.filter(d => {

          const value = this.columnDefs[index].valueGetter({ data: d, colDef: this.columnDefs[index] });
          if (filter.type === 'equals') {
            return value === filter.filter;
          } else if (filter.type === 'contains') {
            return value && value.toString().toLowerCase().indexOf(lowerCaseFilter) >= 0;
          }

          return true;
        });
      }
    }

    const rows = useData.slice(params.startRow, params.endRow);
    params.successCallback(rows, useData.length);
  }

}
