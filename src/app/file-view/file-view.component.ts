import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.scss']
})
export class FileViewComponent implements OnInit {

  rowData = [{
    id: 42,
    val: 'test'
  }];
  columnDefs = [
    { headerName: 'id', field: 'id' },
    { headerName: 'val', field: 'val' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
