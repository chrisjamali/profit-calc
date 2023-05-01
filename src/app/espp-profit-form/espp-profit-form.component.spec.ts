import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsppProfitFormComponent } from './espp-profit-form.component';

describe('EsppProfitFormComponent', () => {
  let component: EsppProfitFormComponent;
  let fixture: ComponentFixture<EsppProfitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsppProfitFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsppProfitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
