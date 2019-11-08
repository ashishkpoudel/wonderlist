import { Component, Input, OnInit } from '@angular/core';
import { Tag, EntryService } from "src/app/core";

@Component({
  selector: 'app-tag-menu',
  templateUrl: './tag-menu.component.html',
  styleUrls: ['./tag-menu.component.css']
})
export class TagMenuComponent implements OnInit {

  @Input()
  selectedTags: Tag[] = [];

  @Input()
  tags: Tag[] = [];

  constructor(
    private entryService: EntryService
  ) { }

  ngOnInit() {
  }

  isSelected(tag: Tag) {
    return this.selectedTags.filter(t => t.id === tag.id).length > 0;
  }

  toggleTag(tag: Tag) {

  }

}
