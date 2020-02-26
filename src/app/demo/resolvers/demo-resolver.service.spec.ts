import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';

import { DemoFacade } from '@app/demo/+store/demo.facade';
import { DemoResolverService } from '@app/demo/resolvers/demo-resolver.service';
import { StoreMockModule } from '@tests/mocks/store-mock-module';

describe('DemoResolverService', () => {
  let service: DemoResolverService;
  const routeMock: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
  routeMock.params = { surveyId: '20' };
  const getMock = jest.fn(() => of());

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [StoreMockModule],
      providers: [DemoResolverService, { provide: DemoFacade, useValue: { setPageTitle: getMock } }]
    })
  );

  beforeEach(() => {
    service = TestBed.inject(DemoResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call setPageTitle action', () => {
    // GIVEN
    // WHEN
    service.resolve(routeMock);
    // THEN
    expect(getMock).toHaveBeenCalled();
  });
});
