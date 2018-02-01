import { TestBed, inject } from '@angular/core/testing';

import { TranslationService } from './translation.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientStub, RegionServiceStub, LoadingServiceStub } from '../testing/index';
import { RegionService } from './core/region.service';
import { LoadingService } from './core/loading/loading.service';

describe('TranslationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TranslationService,
        { provide: HttpClient, useClass: HttpClientStub },
        { provide: RegionService, useClass: RegionServiceStub },
        { provide: LoadingService, useClass: LoadingServiceStub },
      ]
    });
  });

  it('should be created', inject([TranslationService], (service: TranslationService) => {
    expect(service).toBeTruthy();
  }));
});
