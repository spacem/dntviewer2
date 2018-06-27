import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, Injectable } from '@angular/core';

import { FileViewComponent } from './file-view.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DntService } from '../dnt.service';
import { RegionService } from '../core/region.service';
import { RegionServiceStub, CacheInterceptorStub } from '../../testing/index';
import { TranslationService } from '../translation.service';
import { CacheInterceptor } from '../cache.interceptor';
import { Observable } from 'rxjs/Observable';
import { SettingsService } from '../settings.service';

@Component({ selector: 'ag-grid-angular', template: '' })
class AgGridStubComponent {
  @Input() rowData: any;
  @Input() columnDefs: any;
  @Input() gridOptions: any;
}


@Injectable()
class DntServiceStub {
  getData() {
    return Observable.of();
  }
}

@Injectable()
class TranslationServiceStub {
}

describe('FileViewComponent', () => {
  let component: FileViewComponent;
  let fixture: ComponentFixture<FileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [ FileViewComponent, AgGridStubComponent ],
      providers: [
        { provide: DntService, useClass: DntServiceStub },
        { provide: RegionService, useClass: RegionServiceStub },
        { provide: TranslationService, useClass: TranslationServiceStub },
        { provide: CacheInterceptor, useClass: CacheInterceptorStub },
        SettingsService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
