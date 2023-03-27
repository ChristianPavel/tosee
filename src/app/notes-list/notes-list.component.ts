import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { Note} from "../model/note";
import {NoteService} from "../note.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";


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
    this.getDueDateSortedNotes();
  }

  changeStatus(note: Note): void {
    console.log('changeStatus', note);
    this.noteService.changeStatus(note).subscribe()
  }

  delete(note: Note): void {
    console.log('delete', note);
    const id = note.id;
    this.noteService.deleteNote(id).subscribe();
    this.notes = this.notes.filter(n => n !==note);
}

  sortByCreatedDate(notes: Note[]): Note[]{
    notes.sort((a, b) => {
        if (a.created < b.created){
          return -1;
        } else if (a.created > b.created) {
          return 1;
        }
        return 0;
      }
    );
    return notes;
  }

  getCreatedSortedNotes(){
    this.noteService.getNotes().subscribe(notes => {
      this.notes = this.sortByCreatedDate(notes);
    });
  }

  getDueDateSortedNotes(){
    this.noteService.getNotes().subscribe(notes => {
      this.notes = this.sortByDueDate(notes);
    });
  }

  sortByDueDate(notes: Note[]): Note[]{
    notes.sort((a, b) => {

        if (a.dueDate < b.dueDate){
          return -1;
        } else if (a.dueDate > b.dueDate) {
          return 1;
        }
        return 0;
      }
    );
    return notes;
  }
}
