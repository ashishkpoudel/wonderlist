import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { Entry } from 'src/app/core';
import { EntryService } from 'src/app/core';
import { EntryComponent } from "../entry/entry.component";

@Component({
  selector: 'app-entry-index',
  templateUrl: './entry-index.component.html',
  styleUrls: ['./entry-index.component.css']
})
export class EntryIndexComponent implements OnInit {

  entries: Entry[];

  constructor(
    private entryService: EntryService,
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.entryService.getAll().subscribe(data => {
      this.entries = data;
    });
  }

  entryClicked(entry) {
    const dialogRef = this.matDialog.open(EntryComponent, {
      width: '600px',
      data: entry,
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log(data);
    });


  }

}
