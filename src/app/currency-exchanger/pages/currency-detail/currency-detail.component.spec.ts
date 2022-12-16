import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CurrencyDetailComponent } from './currency-detail.component';

describe('CurrencyDetailComponent', () => {
  let component: CurrencyDetailComponent;
  let fixture: ComponentFixture<CurrencyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrencyDetailComponent],
      imports: [HttpClientModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return current date and last year same day date', () => {
    let currentDate = new Date('2022-12-15');
    const expectedOutput = { startDate: '2021-12-15', endDate: '2022-12-15' };

    expect(component.getDates(currentDate)).toEqual(expectedOutput);
  });
});
