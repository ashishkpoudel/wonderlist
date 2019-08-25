import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";

import { Entry } from 'src/app/core';
import { EntryService } from 'src/app/core';
import { EntryComponent } from "../entry/entry.component";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-entry-index',
  templateUrl: './entry-index.component.html',
  styleUrls: ['./entry-index.component.css']
})
export class EntryIndexComponent implements OnInit {

  entries: Entry[];

  constructor(
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private entryService: EntryService,
  ) { }

  ngOnInit() {
    this.entryService.getAll().subscribe(data => {
      this.entries = data.entries;
    });
  }

  addEntryClicked() {
    const dialogRef = this.matDialog.open(EntryComponent, {
      width: '600px'
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
      width: '600px',
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

}
