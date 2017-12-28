import { Component, OnInit } from '@angular/core';
import { FileListService } from '../file-list.service';
import { DntService } from '../dnt.service';
import { ActivatedRoute } from '@angular/router';
import { DntData } from '../dnt-data';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid/main';

@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.scss']
})
export class FileViewComponent implements OnInit {
  subscription: any;

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
    private dntService: DntService) { }

  ngOnInit() {
    const fileName = this.route.snapshot.paramMap.get('fileName');
    this.subscription = this.dntService.getData(fileName).subscribe(data => {
      this.createData(data);
      this.createColumns(data);
    });
  }

  createData(data: DntData) {
    this.rowData = [];
    for (const r of data.data) {
      const row: any = {};
      for (const colName of Object.keys(data.columnIndexes)) {
        row[colName] = r[data.columnIndexes[colName]];
      }
      this.rowData.push(row);
    }
  }

  createColumns(data: DntData) {
    for (const c of data.columnNames) {
      this.columnDefs.push({
        headerName: c,
        field: c
      });
    }
  }
}
