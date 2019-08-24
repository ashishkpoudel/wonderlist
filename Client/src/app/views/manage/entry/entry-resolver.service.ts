import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Entry, EntryService } from 'src/app/core';

@Injectable()
export class EntryResolver implements Resolve<Entry> {

  constructor(
    private entryService: EntryService,
    private router: Router,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.entryService.get(route.params[`id`]);
  }

}
