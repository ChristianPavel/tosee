import {Component, OnInit, ViewChild} from '@angular/core';
import {Note} from "../model/note";
import {NoteService} from "../note.service";
import {MatTableDataSource} from "@angular/material/table";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";
import {SortService} from "../sort-service.service";

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

  constructor(private noteService: NoteService,
              private sortService: SortService,
              private _liveAnnouncer: LiveAnnouncer) {
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getDashboardNotes();

  }

  setTable(): void {
    if (this.filter) {
      this.tableData = new MatTableDataSource(this.unfinishedNotes);
    } else {
      this.tableData = new MatTableDataSource(this.notes);
    }
    this.tableData.sortData = this.sortService.sortData();
    this.tableData.sort = this.sort;
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


  getDashboardNotes() {
    this.noteService.getDashboardNotes().subscribe( notes => {
      this.prepareTableData(notes);
    })
  }

  switchFilter(): void {
    this.filter = !this.filter;
    this.setTable();
  }

  annonceSortChange(event: Sort) {
    if (event.direction) {
      this._liveAnnouncer.announce(`Sorted ${event.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
