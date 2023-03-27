import { Component, OnInit } from '@angular/core';
import { Note} from "../model/note";
import { NoteService} from "../note.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  notes: Note[] = [];

  tableData = new MatTableDataSource<Note>();

  displayedColumns: string [] = ['name', 'description', 'created', 'dueDate', 'done']

  constructor(private noteService: NoteService) {
  }

  ngOnInit(): void {
    this.getDueDateSortedNotes();

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
    this.noteService.getPendingNotes().subscribe(notes => {
      this.tableData = new MatTableDataSource(this.sortByCreatedDate(notes));}
    );
  }

  getDueDateSortedNotes(){
    this.noteService.getPendingNotes().subscribe(notes => {
      this.tableData = new MatTableDataSource(this.sortByDueDate(notes));}
    );
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
