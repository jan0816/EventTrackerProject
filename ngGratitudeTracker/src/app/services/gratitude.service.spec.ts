import { TestBed } from '@angular/core/testing';

import { GratitudeService } from './gratitude.service';

describe('GratitudeService', () => {
  let service: GratitudeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GratitudeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
