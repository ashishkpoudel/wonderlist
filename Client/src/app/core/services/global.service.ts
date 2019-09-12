import { Injectable } from "@angular/core";

@Injectable()
export class GlobalService {
  sidenavOpened: boolean = false;
  showEntryEditComponent: boolean = true;
}
