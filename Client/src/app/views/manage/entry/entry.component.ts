import { Component, Inject, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Entry } from 'src/app/core';
import { EntryService } from 'src/app/core';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  entry: Entry;

  entryForm: FormGroup = this.formBuilder.group({
    title: [''],
    body: [''],
  });

  constructor(
    private dialogRef: MatDialogRef<EntryComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private entryService: EntryService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    if (this.dialogData instanceof Entry) {
      this.entry = this.dialogData;
      this.entryForm.setValue({
        title: this.entry.title,
        body: this.entry.body,
      });
    }
  }

  saveEntryClicked() {
    this.entryService.save(this.entryForm.value).subscribe(data => {
      this.dialogRef.close(data);
    });
  }

  updateEntryClicked() {
    this.entryService.update(this.entry.id, this.entryForm.value).subscribe(data => {
      this.dialogRef.close(data);
    });
  }

}
