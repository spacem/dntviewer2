import { TestBed, inject } from '@angular/core/testing';

import { DntService } from './dnt.service';
import { HttpClientStub, LoadingServiceStub } from '../testing/index';
import { HttpClient } from '@angular/common/http';
import { RegionService } from './core/region.service';
import { LoadingService } from './core/loading/loading.service';

describe('DntService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DntService,
        { provide: HttpClient, useClass: HttpClientStub },
        RegionService,
        { provide: LoadingService, useClass: LoadingServiceStub },
      ]
    });
  });

  it('should be created', inject([DntService], (service: DntService) => {
    expect(service).toBeTruthy();
  }));
});
