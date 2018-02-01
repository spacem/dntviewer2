import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';

import { FileListComponent } from './file-list.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FileListService } from '../file-list.service';
import { RegionService } from '../core/region.service';
import { RegionServiceStub, CacheInterceptorStub } from '../../testing/index';
import { CacheInterceptor } from '../cache.interceptor';
import { Observable } from 'rxjs/Observable';

@Injectable()
class FileListServiceStub {
  files: string[];
  getFiles() {
    return Observable.of(this.files);
  }
}

describe('FileListComponent', () => {
  let component: FileListComponent;
  let fixture: ComponentFixture<FileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [FileListComponent],
      providers: [
        { provide: FileListService, useClass: FileListServiceStub },
        { provide: RegionService, useClass: RegionServiceStub },
        { provide: CacheInterceptor, useClass: CacheInterceptorStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
