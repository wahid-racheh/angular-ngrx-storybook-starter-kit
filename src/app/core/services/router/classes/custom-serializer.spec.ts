import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { CustomSerializer } from './custom-serializer';

const mock = <T, P extends keyof T>(obj: Pick<T, P>): T => obj as T;

describe('CustomSerializer', () => {
  it('should return only `url`, `params` and `queryParams` in the state snapshot', () => {
    // GIVEN
    type routeParams = 'params' | 'queryParams' | 'fragment' | 'data';
    const route: ActivatedRouteSnapshot = mock<ActivatedRouteSnapshot, routeParams>({
      params: {
        val: 'test'
      },
      queryParams: { id: '20' },
      fragment: null,
      data: null
    });
    const state: RouterStateSnapshot = mock<RouterStateSnapshot, 'url' | 'root'>({
      url: '/url',
      root: route
    });
    // WHEN
    const serializer = new CustomSerializer();
    const result = serializer.serialize(state);
    // THEN
    expect(Object.keys(result)).toEqual(['url', 'params', 'queryParams']);
    expect(result.url).toEqual('/url');
    expect(result.queryParams.get('id')).toEqual('20');
    expect(result.params.get('val')).toEqual('test');
  });
});
