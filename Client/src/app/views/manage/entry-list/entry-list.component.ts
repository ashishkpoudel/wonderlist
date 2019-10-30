import { Component, HostListener, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Entry, EntryService, GlobalService, HttpQueryBuilder, Pagination } from 'src/app/core';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css'],
})
export class EntryListComponent implements OnInit {

  addEntry = false;

  selectedEntry?: Entry;

  entries: Entry[] = [];

  entriesPagination: Pagination;

  entriesScrollY: number;

  constructor(
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private entryService: EntryService,
    private globalService: GlobalService,
    private httpQuery: HttpQueryBuilder,
  ) { }

  ngOnInit() {
    const httpQuery = this.httpQuery.clearFilters().page(1);
    if (this.activatedRoute.snapshot.url.toString() === 'trash') httpQuery.addFilter('trashed', true);
    this.entryService.getAll(httpQuery.getParams()).subscribe(
      data => {
      this.entries = data.entries; console.log(this.entries);
      this.entriesPagination = data.pagination;
    });
  }

  entryEditUpdate(entry: any) {
    this.selectedEntry = null;
    this.entries[this.entries.findIndex(e => e.id === entry.id)] = entry;
    window.scrollTo(0, this.entriesScrollY);
    this.snackBar.open('Entry updated successfully', 'Dismiss', {
      horizontalPosition: "left",
      verticalPosition: "bottom",
      duration: 1200,
    });
  }

  entryEditSave(entry: Entry) {
    this.entries.unshift(entry);
    this.addEntry = false;
    this.snackBar.open('Entry saved successfully', 'Dismiss', {
      horizontalPosition: "left",
      verticalPosition: "bottom",
      duration: 1200,
    });
  }

  entryEditCancel(event: any)
  {
    this.selectedEntry = null;
    this.addEntry = false;
  }

  addEntryClick() {
    this.selectedEntry = null;
    this.addEntry = true;
    window.scrollTo(0,0);
  }

  editEntryClick(entry: Entry) {
    if (!entry.trashed && !this.selectedEntry) {
      this.selectedEntry = entry;
      this.addEntry = false;
      this.entriesScrollY = window.scrollY;
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

  @HostListener('document:keydown.escape', ['$event'])
  documentKeydownEscape(event) {
    if (this.selectedEntry) {
      this.selectedEntry = null;
      window.scrollTo(0, this.entriesScrollY);
    }
  }
}
