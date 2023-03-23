import { Component } from '@angular/core';
import { NotesListComponent} from "../notes-list/notes-list.component";
import { NoteService} from "../note.service";

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
    this.getPending();
  }

  getPending(): void {
    this.noteService.getPendingNotes().subscribe(notes => this.notes =notes);
  }
}
