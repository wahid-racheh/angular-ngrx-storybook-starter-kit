import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { environment } from '@env/environment';

import { ApiPathConstant } from '@app/core/constants/api-path-constant';
import { ApiService } from '@app/core/services/api.service';
import { UserService } from '@app/core/services/user/services/user.service';
import * as userMock from '@assets/mocks/user.mock.json';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const url: string = `${environment.baseUrl}` + `/${ApiPathConstant.USER_PATH}`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService, UserService]
    });
  });

  beforeEach(() => {
    environment.useMock = false;
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getById api', async(() => {
    // GIVEN
    const id = 'id';
    // WHEN
    service.getById(id).subscribe((response: any) => {
      expect(response).toEqual(userMock.getById.successResponse);
    });
    // THEN
    const req = httpMock.expectOne(`${url}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(userMock.getById.successResponse, { status: 200, statusText: 'OK' });
    expect(req.request.responseType).toBe('json');
  }));

  it('should call search api', async(() => {
    // GIVEN
    // WHEN
    service.search().subscribe((response: any) => {
      expect(response).toEqual(userMock.search.successResponse);
    });
    // THEN
    const req = httpMock.expectOne(`${url}`);
    expect(req.request.method).toBe('GET');
    req.flush(userMock.search.successResponse, { status: 200, statusText: 'OK' });
    expect(req.request.responseType).toBe('json');
  }));
});
