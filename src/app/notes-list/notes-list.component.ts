import {Component, OnInit} from '@angular/core';
import {Note} from "../model/note";
import {NoteService} from "../note.service";



@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  notes: Note[] = [];

  constructor(protected noteService: NoteService) {
  }

  ngOnInit() {
    this.getNotes();
  }

  changeStatus(note: Note): void {
    this.noteService.changeStatus(note).subscribe()
  }

  delete(note: Note): void {
    const id = note.id;
    this.noteService.deleteNote(id).subscribe();
    this.notes = this.notes.filter(n => n !== note);
  }

  getNotes() {
    this.noteService.getNotes().subscribe( notes => this.notes = notes)
  }

}
