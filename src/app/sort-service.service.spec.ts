import { TestBed } from '@angular/core/testing';

import { SortServiceService } from './sort-service.service';

describe('SortServiceService', () => {
  let service: SortServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
