// // import { ComponentFixture, TestBed } from '@angular/core/testing';

// // import { EsppProfitFormComponent } from './espp-profit-form.component';

// // describe('EsppProfitFormComponent', () => {
// //   let component: EsppProfitFormComponent;
// //   let fixture: ComponentFixture<EsppProfitFormComponent>;

// //   beforeEach(async () => {
// //     await TestBed.configureTestingModule({
// //       declarations: [ EsppProfitFormComponent ]
// //     })
// //     .compileComponents();

// //     fixture = TestBed.createComponent(EsppProfitFormComponent);
// //     component = fixture.componentInstance;
// //     fixture.detectChanges();
// //   });

// //   it('should create', () => {
// //     expect(component).toBeTruthy();
// //   });
// // });
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { EsppProfitFormComponent } from './espp-profit-form.component';
// import { TotalPriceService } from '../services/total-price.service';
// import { CheckQualifyService } from '../services/check-qualify.service';
// import * as moment from 'moment';

// describe('EsppProfitFormComponent', () => {
//   let component: EsppProfitFormComponent;
//   let fixture: ComponentFixture<EsppProfitFormComponent>;
//   let checkQualifyService: CheckQualifyService;
//   let totalPriceService: TotalPriceService;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [EsppProfitFormComponent],
//       providers: [CheckQualifyService, TotalPriceService],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(EsppProfitFormComponent);
//     component = fixture.componentInstance;
//     checkQualifyService = TestBed.inject(CheckQualifyService);
//     totalPriceService = TestBed.inject(TotalPriceService);
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should call checkQualify and getTotalProfit methods when send is called with valid inputs', () => {
//     const offerDate = moment([2021, 1, 1]);
//     const purchaseDate = moment([2022, 1, 1]);

//     const checkQualifySpy = spyOn(checkQualifyService, 'checkQualify');
//     const getTotalProfitSpy = spyOn(totalPriceService, 'getTotalProfit');

//     component.send(
//       offerDate,
//       purchaseDate,
//       100,
//       50,
//       10,
//       0.1,
//       150,
//       true
//     );

//     expect(checkQualifySpy).toHaveBeenCalledWith(offerDate, purchaseDate);
//     expect(getTotalProfitSpy).toHaveBeenCalledWith(
//       55,
//       10,
//       150
//     );
//   });

//   it('should not call checkQualify and getTotalProfit methods when send is called without offerDate and purchaseDate inputs', () => {
//     const checkQualifySpy = spyOn(checkQualifyService, 'checkQualify');
//     const getTotalProfitSpy = spyOn(totalPriceService, 'getTotalProfit');

//     component.send(
//       undefined,
//       undefined,
//       100,
//       50,
//       10,
//       0.1,
//       150,
//       true
//     );

//     expect(checkQualifySpy).not.toHaveBeenCalled();
//     expect(getTotalProfitSpy).not.toHaveBeenCalled();
//   });

//   it('should not call checkQualify and getTotalProfit methods when send is called without all required inputs', () => {
//     const offerDate = moment([2021, 1, 1]);
//     const purchaseDate = moment([2022, 1, 1]);

//     const checkQualifySpy = spyOn(checkQualifyService, 'checkQualify');
//     const getTotalProfitSpy = spyOn(totalPriceService, 'getTotalProfit');

//     component.send(offerDate, purchaseDate, undefined, undefined, undefined, undefined, undefined, true);

//     expect(checkQualifySpy).not.toHaveBeenCalled();
//     expect(getTotalProfitSpy).not.toHaveBeenCalled();
//   });
// });
