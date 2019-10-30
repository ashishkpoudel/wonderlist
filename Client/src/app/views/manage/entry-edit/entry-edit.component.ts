import { Component, Input, Output, EventEmitter, HostListener, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from "@angular/forms";

import { Entry, Media } from 'src/app/core';
import { EntryService, MediaService } from 'src/app/core';

@Component({
  selector: 'app-entry-edit',
  templateUrl: './entry-edit.component.html',
  styleUrls: ['./entry-edit.component.css']
})
export class EntryEditComponent implements OnInit, OnChanges {

  @Input()
  entry: Entry;

  medias: Media[] = [];

  @Output()
  entrySave: EventEmitter<Entry> = new EventEmitter();

  @Output()
  entryUpdate: EventEmitter<Entry> = new EventEmitter();

  @Output()
  entryCancel: EventEmitter<Entry> = new EventEmitter();

  entryForm: FormGroup = this.formBuilder.group({
    title: [null, [Validators.required]],
    body: [null, [Validators.required]],
    media_ids: [[]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private entryService: EntryService,
    private mediaService: MediaService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.entry.currentValue && changes.entry.isFirstChange()) {
      const entry: Entry = changes.entry.currentValue;
      this.entryForm.patchValue({
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
    setTimeout(() => { // fix:detecting change
      this.entryCancel.emit(this.entry);
      this.entryForm.reset();
    }, 0);
  }

  addMediaButtonClick(input: HTMLInputElement) {
    input.click();
    input.addEventListener('change', (event: any) => {
      const files = event.target.files;
      if (files.length > 0) {
        this.mediaService.save({file: files[0], subjectId: null, subjectType: 'entries'}).subscribe(
          data => {
            this.medias.push(data);
            this.entryForm.patchValue({media_ids: [data.id]});
            input.form.reset();
          }
        );
      }
    }, {once: true});
  }
}
