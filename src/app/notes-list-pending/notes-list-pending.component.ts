import { Component } from '@angular/core';
import { NotesListComponent} from "../notes-list/notes-list.component";
import { NoteService} from "../note.service";
import {MatTableDataSource} from "@angular/material/table";
import {Note} from "../model/note";
import {LiveAnnouncer} from "@angular/cdk/a11y";

@Component({
  selector: 'app-notes-list-pending',
  templateUrl: './notes-list-pending.component.html',
  styleUrls: ['./notes-list-pending.component.css']
})
export class NotesListPendingComponent extends NotesListComponent{
  constructor(protected override noteService: NoteService) {
    super(noteService);
  }

  override ngOnInit() {
    this.getDueDateSortedNotes();
  }

  override getCreatedSortedNotes(){
    this.noteService.getPendingNotes().subscribe(notes => {
      this.notes = this.sortByCreatedDate(notes);
    });
  }

  override getDueDateSortedNotes(){
    this.noteService.getPendingNotes().subscribe(notes => {
      this.notes = this.sortByDueDate(notes);
    });
  }
}
