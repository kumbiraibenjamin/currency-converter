import { TestBed } from '@angular/core/testing';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsService);
    let store: any = {};

    const mockLocalStorage = {
      getItem: (key: string): any => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: any) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };

    spyOn(sessionStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(sessionStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(sessionStorage, 'clear').and.callFake(mockLocalStorage.clear);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store  and retrive item in sessionStorage', () => {
    const item: { test: string } = { test: 'test' };

    service.setSessionStorage('someItem', item);
    expect(service.getSessionStorage('someItem')).toEqual(item);
  });
});
