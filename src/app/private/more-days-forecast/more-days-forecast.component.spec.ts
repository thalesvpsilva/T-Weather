import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreDaysForecastComponent } from './more-days-forecast.component';

describe('MoreDaysForecastComponent', () => {
  let component: MoreDaysForecastComponent;
  let fixture: ComponentFixture<MoreDaysForecastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoreDaysForecastComponent]
    });
    fixture = TestBed.createComponent(MoreDaysForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
