import {Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TagService, Tag, Pagination } from "src/app/core";

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit {

  selectedTag: Tag;

  tags: Tag[];

  tagsPagination: Pagination;

  tagForm = this.formBuilder.group({
    name: [null, Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private tagService: TagService
  ) { }

  ngOnInit() {
    this.tagService.getAll().subscribe(
      data => {
        this.tags = data.tags;
        this.tagsPagination = data.pagination;
      }
    );
  }

  nameInputBlur() {
    this.selectedTag = null;
  }

  editClick(tag: Tag) {
    this.selectedTag = tag;
    this.tagForm.setValue({
      name: tag.name
    });
  }

  tagFormSubmit(tagForm) {
    this.tagService.update(this.selectedTag.id, tagForm.value).subscribe(
      data => {
        this.tags[this.tags.findIndex(tag => tag.id === data.id)]  = data;
        this.selectedTag = null;
      }
    );
  }

}
