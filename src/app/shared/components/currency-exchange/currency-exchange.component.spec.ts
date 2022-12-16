import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CurrencyExchangeComponent } from './currency-exchange.component';

describe('CurrencyExchangeComponent', () => {
  let component: CurrencyExchangeComponent;
  let fixture: ComponentFixture<CurrencyExchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrencyExchangeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the buttons when loading', () => {
    component.loading = true;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should enable the buttons when not loading and not in error', () => {
    component.loading = false;
    component.error = false;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it('should disable the buttons when in error', () => {
    component.error = true;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should see full name of currency when in details', () => {
    component.showDetailsButton = false;
    component.from = 'EUR';
    component.fromName = 'Euro';

    const expectedOutput = 'EUR - Euro';

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.title')?.textContent).toContain(
      expectedOutput
    );
  });

  it('should see title "Currency Exchanger" when in home page', () => {
    component.showDetailsButton = true;

    const expectedOutput = 'Currency Exchanger';

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.title')?.textContent).toContain(
      expectedOutput
    );
  });
});
