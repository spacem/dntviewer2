import { TestBed, inject } from '@angular/core/testing';

import { FileListService } from './file-list.service';

describe('FileListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileListService]
    });
  });

  it('should be created', inject([FileListService], (service: FileListService) => {
    expect(service).toBeTruthy();
  }));
});
