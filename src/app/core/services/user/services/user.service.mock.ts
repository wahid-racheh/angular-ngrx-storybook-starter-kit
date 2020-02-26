import { cloneDeep } from 'lodash';
import { Observable, of } from 'rxjs';

import { throwMockHttpError } from '@app/core/interceptors/error/helpers/error.helpers';
import { User } from '@app/core/services/user/models/user.interface';
import * as userMock from '@assets/mocks/user.mock.json';

export class UserServiceMock {
  public static getById(): Observable<User> {
    return userMock.getById.returnSuccess
      ? of(cloneDeep(userMock.getById.successResponse))
      : throwMockHttpError(cloneDeep(userMock.getById.failureResponse));
  }

  public static search(): Observable<User[]> {
    return userMock.search.returnSuccess
      ? of(cloneDeep(userMock.search.successResponse))
      : throwMockHttpError(cloneDeep(userMock.search.failureResponse));
  }
}
