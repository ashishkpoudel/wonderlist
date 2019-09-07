import {Component, HostListener, OnInit} from '@angular/core';
import { MatDialog } from "@angular/material/dialog";

import { Entry, Pagination } from 'src/app/core';
import { EntryService } from 'src/app/core';
import { EntryComponent } from "../entry/entry.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpQueryBuilder } from "src/app/core";

@Component({
  selector: 'app-entry-index',
  templateUrl: './entry-index.component.html',
  styleUrls: ['./entry-index.component.css']
})
export class EntryIndexComponent implements OnInit {

  entries: Entry[];

  sidenavOpened: boolean = true;

  entriesPagination: Pagination;

  constructor(
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private entryService: EntryService,
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

  addEntryClicked() {
    const dialogRef = this.matDialog.open(EntryComponent, {
      width: '650px'
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data instanceof Entry) {
        this.entries.unshift(data);
        this.snackBar.open("Entry created successfully", 'Dismiss', {
          verticalPosition: "bottom",
          horizontalPosition: "center",
          duration: 1200
        });
      }
    });
  }

  editEntryClicked(entry) {
    const dialogRef = this.matDialog.open(EntryComponent, {
      width: '650px',
      data: entry,
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data instanceof Entry) {
        const index = this.entries.findIndex(entry => entry.id === data.id);
        this.entries[index] = data;
        this.snackBar.open('Entry updated successfully', 'Dismiss', {
          horizontalPosition: "center",
          verticalPosition: "bottom",
          duration: 1200,
        });
      }
    });
  }

  deleteEntryClicked(entry) {
    this.entryService.delete(entry.id).subscribe(data => {
        const index = this.entries.findIndex(e => e.id === entry.id);
        this.entries.splice(index, 1);
        this.snackBar.open('Entry deleted successfully', 'Dismiss', {
          horizontalPosition: "center",
          verticalPosition: "bottom",
          duration: 1200,
        });
      }
    )
  }

  notesClick() {
    const params = this.httpQuery.clearFilters();
    this.entryService.getAll(params).subscribe(
      data => {
        this.entries = data.entries;
        document.documentElement.scrollTop = 0;
      }
    );
  }

  trashClick() {
    const params = this.httpQuery.clearFilters().page(0).addFilter('trashed', true).getParams();
    this.entryService.getAll(params).subscribe(
      data => {
        this.entries = data.entries
      }
    );
  }

  @HostListener('window:scroll', ['$event'])
  windowScroll(event) {
    if (window.pageYOffset > (document.body.clientHeight - window.innerHeight) - 30) {
      this.httpQuery.page(this.entriesPagination.current_page + 1);
      this.entryService.getAll(this.httpQuery.getParams()).subscribe(data => {
        this.entries.push(...data.entries);
        this.entriesPagination = data.pagination;
      });
    }
  }
}

