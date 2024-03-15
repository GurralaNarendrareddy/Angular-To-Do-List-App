import { TestBed } from '@angular/core/testing';

import { ToDoListServicesService } from './to-do-list-services.service';

describe('ToDoListServicesService', () => {
  let service: ToDoListServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDoListServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
