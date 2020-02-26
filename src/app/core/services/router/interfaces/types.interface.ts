import { NavigationExtras, Params } from '@angular/router';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface RouterStateParams {
  path: any[];
  query?: object;
  extras?: NavigationExtras;
}
