import { Component } from '@angular/core';
import { NotesListComponent} from "../notes-list/notes-list.component";
import { NoteService} from "../note.service";

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
    this.getFinished();
  }

  getFinished(): void {
    this.noteService.getFinishedNotes().subscribe(notes => this.notes =notes);
  }
}
