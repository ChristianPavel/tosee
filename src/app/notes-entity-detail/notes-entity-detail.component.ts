import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Location} from "@angular/common";

import {Note} from "../model/note";
import { NoteService} from "../note.service";

@Component({
  selector: 'app-notes-entity-detail',
  templateUrl: './notes-entity-detail.component.html',
  styleUrls: ['./notes-entity-detail.component.css']
})
export class NotesEntityDetailComponent implements OnInit{
  @Input() note?: Note;

  ngOnInit() {
    this.getNote();
  }

  constructor(private location: Location, private activatedRoute: ActivatedRoute, private noteService: NoteService) {
  }

  changeStatus(){
    if (this.note)
    this.note.done = !this.note.done;
  }

  getNote(): void {
    const id = Number((this.activatedRoute.snapshot.paramMap.get('id')));
    this.noteService.getNote(id).subscribe(note => this.note = note);
  }

  delete(): void {
    if (this.note) {
      const id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
      this.noteService.deleteNote(id).subscribe(() => this.goBack());
    }

  }

  goBack(): void {
    this.location.back();
  }

  update(): void {
    if (this.note) {
      const id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
      this.noteService.update(this.note, id)
        .subscribe(() => this.goBack());
    }
}
}
