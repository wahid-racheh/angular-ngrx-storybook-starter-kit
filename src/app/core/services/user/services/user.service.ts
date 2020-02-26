import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

import { ApiPathConstant } from '@app/core/constants/api-path-constant';
import { ApiService } from '@app/core/services/api.service';
import { User } from '@app/core/services/user/models/user.interface';
import { UserServiceMock } from '@app/core/services/user/services/user.service.mock';

@Injectable()
export class UserService {
  private url: string = `/${ApiPathConstant.USER_PATH}`;

  constructor(private apiService: ApiService) {}

  public getById(id: string): Observable<User> {
    return environment.useMock
      ? UserServiceMock.getById()
      : this.apiService.get(`${this.url}/${id}`);
  }

  public search(): Observable<User[]> {
    return environment.useMock ? UserServiceMock.search() : this.apiService.get(`${this.url}`);
  }
}
