import { Component } from '@angular/core';
import { NotesListComponent} from "../notes-list/notes-list.component";
import { NoteService} from "../note.service";
import {MatTableDataSource} from "@angular/material/table";
import {Note} from "../model/note";
import {LiveAnnouncer} from "@angular/cdk/a11y";

@Component({
  selector: 'app-notes-list-finished',
  templateUrl: './notes-list-finished.component.html',
  styleUrls: ['./notes-list-finished.component.css']
})
export class NotesListFinishedComponent extends NotesListComponent{

  constructor(protected override noteService: NoteService) {
    super(noteService);
  }

  override ngOnInit() {
    this.getCreatedSortedNotes();
  }

  override getCreatedSortedNotes(){
    this.noteService.getFinishedNotes().subscribe(notes => {
      this.notes = this.sortByCreatedDate(notes);
    });
  }
  override getDueDateSortedNotes(){
    this.noteService.getFinishedNotes().subscribe(notes => {
      this.notes = this.sortByDueDate(notes);
    });
  }
  override getFinishedSortedNotes() {
    this.noteService.getFinishedNotes().subscribe(notes => {
      this.notes = this.sortByFinished(notes);
    });
  }
}
