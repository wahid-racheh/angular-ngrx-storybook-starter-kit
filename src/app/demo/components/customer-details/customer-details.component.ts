import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserFacade } from '@app/core/services/user/+store/user.facade';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  @Input() public group: FormGroup;

  public isLoading$: Observable<boolean>;
  public customerList$: Observable<any[]>;
  private unsubscribe$: Subject<void> = new Subject<void>();

  public addressGroup: FormGroup;
  public genderList = [
    { id: 'M', text: 'Man' },
    { id: 'W', text: 'Woman' }
  ];
  public defaultDate: moment.Moment = moment()
    .clone()
    .subtract(30, 'years');
  public minDate: moment.Moment = moment()
    .clone()
    .subtract(50, 'years');
  public maxDate: moment.Moment = moment();

  public hasError = (controlName: string, errorName: string, group: FormGroup) => {
    return group.controls[controlName].hasError(errorName);
  };

  constructor(private userFacade: UserFacade) {}

  public ngOnInit(): void {
    if (this.group) {
      this.addressGroup = this.group.get('address') as FormGroup;

      this.isLoading$ = this.userFacade.isLoading$;
      this.customerList$ = this.userFacade.userList$;

      this.userFacade.user$.pipe(takeUntil(this.unsubscribe$)).subscribe((customer: any) => {
        if (customer) {
          this.group.patchValue(
            {
              firstName: customer.username,
              lastName: customer.name,
              phoneNumber: customer.phone,
              address: {
                street: customer.address.street,
                suite: customer.address.suite,
                city: customer.address.city,
                zipcode: customer.address.zipcode
              }
            },
            { emitEvent: false }
          );
        }
      });
    }
  }

  public handleSelect(item: any) {
    this.userFacade.getUser(item.id);
  }

  public handleReset() {
    this.group.patchValue(
      {
        firstName: null,
        lastName: null,
        phoneNumber: null,
        address: {
          street: null,
          suite: null,
          city: null,
          zipcode: null
        }
      },
      { emitEvent: false }
    );
  }

  public handleSearch(value: string): void {
    this.userFacade.search(value);
  }

  public handleGenderChange(value: any): void {}
  public handleDobChange(value: any): void {}
}
