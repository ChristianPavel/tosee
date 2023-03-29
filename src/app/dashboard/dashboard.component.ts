import {Component, OnInit} from '@angular/core';
import {Note} from "../model/note";
import {NoteService} from "../note.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  notes: Note[] = [];

  unfinishedNotes: Note[] = [];

  tableData = new MatTableDataSource<Note>();

  displayedColumns: string [] = ['name', 'description', 'created', 'dueDate', 'finished', 'done']

  filter: boolean = false;

  constructor(private noteService: NoteService) {
  }

  ngOnInit(): void {
    this.getDueDateSortedNotes();

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

  sortByDueDate(notes: Note[]): Note[] {
    notes.forEach((note) => {
      if (note.dueDate === null) {
        note.dueDate = "";
      }

    })

    notes.sort((a, b) => {
        const first = a.dueDate;
        const second = b.dueDate;

        if (first && second === "") {
          return 0;
        }
        if (first === "") {
          return 1;
        }
        if (second === "") {
          return -1;
        }

        if (first < second) {
          return -1;
        } else if (first > second) {
          return 1;
        }
        return 0;
      }
    );
    return notes;
  }

  setTable(): void {
    if (this.filter) {
      this.tableData = new MatTableDataSource(this.unfinishedNotes);
    } else {
      this.tableData = new MatTableDataSource(this.notes);
    }
  }


  prepareTableData(notes: Note[]): void {
    this.notes = notes;
    this.unfinishedNotes = [];
    this.notes.forEach(el => {
      if (!el.done) {
        this.unfinishedNotes.push(el);
      }
    });
    if (this.unfinishedNotes.length > 5) {
      this.unfinishedNotes = this.unfinishedNotes.slice(0, 5);
    }
    if (this.notes.length > 5) {
      this.notes = this.notes.slice(0, 5);
    }
    this.setTable();
  }

  getCreatedSortedNotes() {
    this.noteService.getDashboardNotes().subscribe(notes => {
      this.prepareTableData(this.sortByCreatedDate(notes));
    });
  }

  getDueDateSortedNotes() {
    this.noteService.getDashboardNotes().subscribe(notes => {
      this.prepareTableData(this.sortByDueDate(notes));
    });
  }

  switchFilter(): void {
    this.filter = !this.filter;
    this.setTable();
  }

}
