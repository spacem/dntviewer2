import { TestBed, inject } from '@angular/core/testing';

import { FileListService } from './file-list.service';
import { HttpClientStub, LoadingServiceStub } from '../testing/index';
import { RegionService } from './core/region.service';
import { LoadingService } from './core/loading/loading.service';
import { HttpClient } from '@angular/common/http';

describe('FileListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FileListService,
        { provide: HttpClient, useClass: HttpClientStub },
        RegionService,
        { provide: LoadingService, useClass: LoadingServiceStub },
      ]
    });
  });

  it('should be created', inject([FileListService], (service: FileListService) => {
    expect(service).toBeTruthy();
  }));
});
