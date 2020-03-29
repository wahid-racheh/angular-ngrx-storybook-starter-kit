import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ErrorFacade } from '@app/core/interceptors/error/+store/error.facade';
import { ErrorInterceptorService } from '@app/core/interceptors/error/services/error-interceptor.service';

describe('ErrorInterceptorService', () => {
  let service: ErrorInterceptorService;
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let router: Router;
  let errorFacade: ErrorFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        ErrorInterceptorService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptorService,
          multi: true
        },
        {
          provide: ErrorFacade,
          useValue: {
            throw404Error: jest.fn(),
            throw500Error: jest.fn(),
            throwUnauthorizedError: jest.fn(),
            throwCustomError: jest.fn()
          }
        }
      ]
    });
    service = TestBed.inject(ErrorInterceptorService);
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    errorFacade = TestBed.inject(ErrorFacade);

    spyOn(service, 'intercept');
  });

  beforeEach(() => {
    httpMock.verify();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(errorFacade).toBeTruthy();
  });

  it('should throw `throw500Error`', fakeAsync(() => {
    callHttp(500, 'Internal server error', (response: any) => {
      expect(response.status).toEqual(500);
      expect(response.statusText).toEqual('Internal server error');
      expect(errorFacade.throw500Error).toHaveBeenCalled();
    });
  }));

  it('should throw `throwUnauthorizedError`', fakeAsync(() => {
    callHttp(403, 'Unauthorized', (response: any) => {
      expect(response.status).toEqual(403);
      expect(response.statusText).toEqual('Unauthorized');
      expect(errorFacade.throwUnauthorizedError).toHaveBeenCalled();
    });
  }));

  it('should throw `throw404Error`', fakeAsync(() => {
    callHttp(404, '404 not found', (response: any) => {
      expect(response.status).toEqual(400);
      expect(response.statusText).toEqual('404 not found');
      expect(errorFacade.throw404Error).toHaveBeenCalled();
    });
  }));

  it('should throw `throwCustomError`', fakeAsync(() => {
    callHttp(0, 'custom error', (response: any) => {
      expect(response.status).toEqual(0);
      expect(response.statusText).toEqual('custom error');
      expect(errorFacade.throwCustomError).toHaveBeenCalled();
    });
  }));

  it('should return success response', fakeAsync(() => {
    callHttp(200, 'Success', (response: any) => {
      expect(response.status).toEqual(200);
      expect(response.statusText).toEqual('Success');
    });
  }));

  const callHttp = (status: number, statusText: string, cb) =>
    fakeAsync(() => {
      router.initialNavigation();
      tick(100);

      expect(errorFacade.resetState).toHaveBeenCalled();

      http.get('/fakeApi').subscribe(
        (response: any) => {
          tick(100);
          expect(response).toBeTruthy();
          cb(response);
        },
        (error: any) => {
          tick(100);
          expect(error).toBeTruthy();
          cb(error);
        }
      );

      const req = httpMock.expectOne('/fakeApi');
      expect(req.request.method).toEqual('GET');
      req.flush({ status, statusText });
    });
});
