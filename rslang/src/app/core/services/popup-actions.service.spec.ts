import { TestBed } from '@angular/core/testing';

import { PopupActionsService } from './popup-actions.service';

describe('PopupActionsService', () => {
  let service: PopupActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
