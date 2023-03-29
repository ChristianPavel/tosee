import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {Note} from "../model/note";
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
    this.noteService.changeStatus(note).subscribe()
  }

  delete(note: Note): void {
    const id = note.id;
    this.noteService.deleteNote(id).subscribe();
    this.notes = this.notes.filter(n => n !== note);
  }

  sortByCreatedDate(notes: Note[]): Note[] {
    notes.sort((a, b) => {
        if (a.created < b.created) {
          return -1;
        } else if (a.created > b.created) {
          return 1;
        }
        return 0;
      }
    );
    return notes;
  }

  getCreatedSortedNotes() {
    this.noteService.getNotes().subscribe(notes => {
      this.notes = this.sortByCreatedDate(notes);
    });

  }

  getDueDateSortedNotes() {
    this.noteService.getNotes().subscribe(notes => {
      this.notes = this.sortByDueDate(notes);
    });
  }

  getFinishedSortedNotes() {
    this.noteService.getNotes().subscribe(notes => {
      this.notes = this.sortByFinished(notes);
    });
  }

  sortByFinished(notes: Note[]): Note[] {
    notes.forEach((note) => {
      note.finished = this.fillDate(note.finished);
    })
    notes.sort((a, b) => {
        return this.sortDates(a.finished, b.finished, true);
      }
    );
    return notes;
  }

  sortByDueDate(notes: Note[]): Note[] {

    notes.forEach((note) => {
      note.dueDate = this.fillDate(note.dueDate);
    })

    notes.sort((a, b) => {
        return this.sortDates(a.dueDate, b.dueDate, false);
      }
    );
    return notes;
  }

  fillDate(date: string): string{
    if (date === null) {
      return "";
    }
    return date;
  }

  sortDates(first: string, second: string, reverse: boolean): number {
    const a = first;
    const b = second;
    if (first && second === "") {
      return 0;
    }
    if (first === "") {
      return 1;
    }
    if (second === "") {
      return -1;
    }
    if (reverse) {
      if (first < second) {
        return 1;
      } else if (first > second) {
        return -1;
      }
    } else {
      if (first < second) {
        return -1;
      } else if (first > second) {
        return 1;
      }
    }
    return 0;
  }
}
