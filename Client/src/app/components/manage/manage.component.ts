import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Entry } from 'src/app/core';
import { EntryService } from 'src/app/core';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  entries: Entry[];

  entry: Entry;

  entryForm: FormGroup = this.formBuilder.group({
    title: [''],
    body: ['']
  });

  constructor(
    private entryService: EntryService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.entryService.getAll().subscribe(data => {
      this.entries = data;
    });

    this.entryForm.valueChanges.subscribe(() => {
      this.entryService.update(this.entry, this.entryForm.value)
        .subscribe();
    });
  }

  entryClicked(entry: Entry) {
    this.entry = entry;
    this.entryForm.setValue({title: this.entry.title, body: this.entry.body});
  }

  deleteEntryClicked(entry: Entry) {
    this.entryService.delete(entry).subscribe(data => {
      this.entries = this.entries.filter((e) => e.id !== entry.id);
    });
  }

}
