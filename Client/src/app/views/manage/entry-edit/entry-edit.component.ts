import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
  cancel: EventEmitter<any> = new EventEmitter();

  entryForm: FormGroup = this.formBuilder.group({
    title: [null, [Validators.required]],
    body: [null, [Validators.required]],
  });

  constructor(
    private entryService: EntryService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.entry.currentValue) {
      const entry: Entry = changes.entry.currentValue;
      this.entryForm.setValue({
        title: entry.title,
        body: entry.body,
      });
    }
  }

  postClick() {
    this.entryService.save(this.entryForm.value).subscribe(
      data => this.entrySave.emit(data)
    );
  }

  updateClick() {
    this.entryService.update(this.entry.id, this.entryForm.value).subscribe(
      data => this.entryUpdate.emit(data)
    );
  }

  cancelClick() {
    this.entryForm.reset();
    this.cancel.emit();
  }

}