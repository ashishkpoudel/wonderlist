import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from "@angular/forms";

import { Entry, Media, Tag } from 'src/app/core';
import { EntryService, MediaService, TagService } from 'src/app/core';

@Component({
  selector: 'app-entry-edit',
  templateUrl: './entry-edit.component.html',
  styleUrls: ['./entry-edit.component.css']
})
export class EntryEditComponent implements OnInit, OnChanges {

  @Input()
  entry: Entry = new Entry();

  @Output()
  entrySave: EventEmitter<Entry> = new EventEmitter();

  @Output()
  entryUpdate: EventEmitter<Entry> = new EventEmitter();

  @Output()
  entryCancel: EventEmitter<Entry> = new EventEmitter();

  tags: Tag[];

  entryForm: FormGroup = this.formBuilder.group({
    title: [null, [Validators.required]],
    body: [null, [Validators.required]],
    media_ids: [[]]
  });

  showTagDropdown: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private entryService: EntryService,
    private mediaService: MediaService,
    private tagService: TagService
  ) {
  }

  ngOnInit(): void {
    this.tagService.getAll().subscribe(
      data => {
        this.tags = data.tags
      }
    );
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

  addMediaClick(input: HTMLInputElement) {
    input.click();
    input.addEventListener('change', (event: any) => {
      const files = event.target.files;
      if (files.length > 0) {
        this.mediaService.save({file: files[0], subjectId: null, subjectType: 'entries'}).subscribe(
          data => {
            this.entry.media.push(data);
            this.entryForm.patchValue({media_ids: this.entry.media.map(media => media.id)});
            input.form.reset();
          }
        );
      }
    }, {once: true});
  }

  removeMediaClick(media: Media) {
    this.mediaService.delete(media.id).subscribe(
      data => {
        this.entry.media = this.entry.media.filter(m => m.id !== media.id);
      }
    );
  }

  addTagClick() {
    this.showTagDropdown = !this.showTagDropdown;
  }
}
