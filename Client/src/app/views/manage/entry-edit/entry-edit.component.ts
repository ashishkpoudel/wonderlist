import { Component, Input, Output, EventEmitter, HostListener, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from "@angular/forms";

import { Entry } from 'src/app/core';
import { EntryService } from 'src/app/core';

@Component({
  selector: 'app-entry-edit',
  templateUrl: './entry-edit.component.html',
  styleUrls: ['./entry-edit.component.css']
})
export class EntryEditComponent implements OnInit, OnChanges {

  @Input()
  entry: Entry;

  @Output()
  entrySave: EventEmitter<Entry> = new EventEmitter();

  @Output()
  entryUpdate: EventEmitter<Entry> = new EventEmitter();

  @Output()
  entryCancel: EventEmitter<Entry> = new EventEmitter();

  entryForm: FormGroup = this.formBuilder.group({
    title: [null, [Validators.required]],
    body: [null, [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private entryService: EntryService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.entry.currentValue && changes.entry.isFirstChange()) {
      const entry: Entry = changes.entry.currentValue;
      this.entryForm.setValue({
        title: entry.title,
        body: entry.body,
      });
    }
  }

  postClick() {
    this.entryService.save(this.entryForm.value).subscribe(
      data => {
        this.entrySave.emit(data);
        this.entryForm.reset()
      }
    );
  }

  updateClick() {
    this.entryService.update(this.entry.id, this.entryForm.value).subscribe(
      data => {
        this.entryUpdate.emit(data);
        this.entryForm.reset();
      }
    );
  }

  cancelClick() {
    setTimeout(() => { // fix not detecting change
      this.entryCancel.emit(this.entry);
      this.entryForm.reset();
    }, 0);
  }
}
