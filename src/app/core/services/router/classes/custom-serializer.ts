import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

import { RouterStateUrl } from '@app/core/services/router/interfaces/types.interface';

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  public serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const {
      url,
      root: { queryParams, params }
    } = routerState;

    const mapParams: Map<string, string> = new Map<string, string>();
    const mapQueryParams: Map<string, string> = new Map<string, string>();
    Object.keys(params).forEach(key => mapParams.set(key, params[key]));
    Object.keys(queryParams).forEach(key => mapQueryParams.set(key, queryParams[key]));
    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params: mapParams, queryParams: mapQueryParams };
  }
}
