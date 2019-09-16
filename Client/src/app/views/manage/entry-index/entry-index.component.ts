import { Component, HostListener, OnInit} from '@angular/core';

import { Entry, EntryService, GlobalService, HttpQueryBuilder, Pagination } from 'src/app/core';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-entry-index',
  templateUrl: './entry-index.component.html',
  styleUrls: ['./entry-index.component.css'],
})
export class EntryIndexComponent implements OnInit {

  addEntry = false;

  selectedEntry?: Entry;

  entries: Entry[] = [];

  entriesPagination: Pagination;

  constructor(
    private snackBar: MatSnackBar,
    private entryService: EntryService,
    private globalService: GlobalService,
    private httpQuery: HttpQueryBuilder,
  ) { }

  ngOnInit() {
    const params = this.httpQuery.page(1).getParams();
    this.entryService.getAll(params).subscribe(
      data => {
      this.entries = data.entries;
      this.entriesPagination = data.pagination;
    });
  }

  entryEditUpdate(entry: any) {
    this.selectedEntry = null;
    this.entries[this.entries.findIndex(e => e.id === entry.id)] = entry;
    this.snackBar.open('Entry updated successfully', 'Dismiss', {
      horizontalPosition: "left",
      verticalPosition: "bottom",
      duration: 1200,
    });
  }

  entryEditSave(entry: Entry) {
    this.entries.unshift(entry);
    this.snackBar.open('Entry saved successfully', 'Dismiss', {
      horizontalPosition: "left",
      verticalPosition: "bottom",
      duration: 1200,
    });
  }

  entryEditCancel(event: any)
  {
    this.selectedEntry = null;
  }

  addEntryClick() {
    this.selectedEntry = null;
    this.addEntry = true;+ 0=-
  }

  editEntryClick(entry: Entry) {
    if (! entry.trashed) {
      this.selectedEntry = entry;
    }
  }

  deleteEntryClick(entry: Entry) {
    this.entryService.delete(entry.id).subscribe(data => {
        const index = this.entries.findIndex(e => e.id === entry.id);
        this.entries.splice(index, 1);
        this.snackBar.open('Entry deleted successfully', 'Dismiss', {
          horizontalPosition: "left",
          verticalPosition: "bottom",
          duration: 1200,
        });
      }
    )
  }

  restoreEntryClick(entry: Entry) {
    this.entryService.restore(entry.id).subscribe(
      data => {
        this.entries.splice(this.entries.findIndex(e => e.id === entry.id), 1);
        this.snackBar.open('Entry restored successfully', 'Dismiss', {
          horizontalPosition: "left",
          verticalPosition: "bottom",
          duration: 1200,
        });
      }
    );
  }

  notesClick() {
    const params = this.httpQuery.page(1).clearFilters().getParams();
    this.entryService.getAll(params).subscribe(
      data => {
        this.entries = data.entries;
        document.documentElement.scrollTop = 0;
        this.globalService.showEntryEditComponent = true;
      }
    );
  }

  trashClick() {
    const params = this.httpQuery.clearFilters().page(1).addFilter('trashed', true).getParams();
    this.entryService.getAll(params).subscribe(
      data => {
        this.entries = data.entries
        this.globalService.showEntryEditComponent = false;
      }
    );
  }

  @HostListener('window:scroll', ['$event'])
  windowScroll(event) {
    if (window.pageYOffset > (document.body.clientHeight - window.innerHeight) - 30) {
      this.httpQuery.page(this.entriesPagination.current_page + 1);
      this.entryService.getAll(this.httpQuery.getParams()).subscribe(
        data => {
          this.entries.push(...data.entries);
          this.entriesPagination = data.pagination;
        }
      );
    }
  }
}
