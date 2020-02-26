import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';

import { ErrorFacade } from '@app/core/interceptors/error/+store/error.facade';
import { ErrorInterceptorService } from '@app/core/interceptors/error/services/error-interceptor.service';

describe('ErrorInterceptorService', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let service: ErrorInterceptorService;
  let errorFacade: ErrorFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ErrorInterceptorService,
        {
          provide: ErrorFacade,
          useValue: {
            throw404Error: jest.fn(),
            throw500Error: jest.fn(),
            throwUnauthorizedError: jest.fn(),
            throwCustomError: jest.fn()
          }
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptorService,
          multi: true
        }
      ]
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ErrorInterceptorService);
    errorFacade = TestBed.inject(ErrorFacade);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const callHttp = (status: number, statusText: string, cb) =>
    async(() => {
      http.get('/api').subscribe(
        response => {
          expect(response).toBeTruthy();
          cb(response);
        },
        error => {
          expect(error).toBeTruthy();
          cb(error);
        }
      );
      const httpRequest = httpMock.expectOne('/api');
      httpRequest.flush('', { status, statusText });
      httpMock.verify();
    });

  it('should throw `throw500Error`', async(() => {
    callHttp(500, 'Internal server error', (response: any) => {
      expect(errorService.throw500Error).toHaveBeenCalled();
    });
  }));

  it('should throw `throwUnauthorizedError`', async(() => {
    callHttp(403, 'Unauthorized', (response: any) => {
      expect(errorService.throwUnauthorizedError).toHaveBeenCalled();
    });
  }));

  it('should throw `throw404Error`', async(() => {
    callHttp(404, '404 not found', (response: any) => {
      expect(errorService.throw404Error).toHaveBeenCalled();
    });
  }));

  it('should throw `throwCustomError`', async(() => {
    callHttp(0, 'custom error', (response: any) => {
      expect(errorService.throwCustomError).toHaveBeenCalled();
    });
  }));

  it('should return success response', async(() => {
    callHttp(200, 'Success', (response: any) => {
      expect(response).toBeDefined();
    });
  }));
});
