import {Component, OnInit, ViewChild} from '@angular/core';
import {Note} from "../model/note";
import {NoteService} from "../note.service";
import {MatTableDataSource} from "@angular/material/table";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";

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
    this.tableData.sortData = this.sortData()
    this.tableData.sort = this.sort;
  }

// custom sort function
  sortData() {
    let sortFunction =
      (items: Note[], sort: MatSort): Note[] =>  {
        if (!sort.active || sort.direction === '') {
          return items;
        }  return items.sort((a: Note, b: Note) => {
          let comparatorResult = 0;
          switch (sort.active) {
            case 'name':
              comparatorResult = a.name.toLowerCase().localeCompare(b.name.toLowerCase());
              break;
            case 'description':
              comparatorResult = this.sortText(a.description, b.description);
              break;
            case 'created':
              comparatorResult = this.sortDates(a.created, b.created, false);
              break;
            case 'dueDate':
              comparatorResult = this.sortDates(a.dueDate, b.dueDate, false);
              break;
            case 'finished':
              comparatorResult = this.sortDates(a.finished, b.finished, true);

              break;
            default:
              comparatorResult = a.name.localeCompare(b.name);
              break;
          }
          return comparatorResult * (sort.direction == 'asc' ? 1 : -1);
        });
      }; return sortFunction;
  }

  sortText(a: string, b: string) {
    if (a === "" && b === ""){
       return 0;
    } else  if (a === ""){
      return 1;
    } else  if (b === ""){
      return -1;
    } else {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    }
  }
  sortDates(first: string, second: string, reverse: boolean): number {
    if (first === null && second === null ) {
      return 0;
    }
    if (first === null) {
      return 1;
    }
    if (second === null) {
      return -1;
    }
    if (reverse) {
      if (first < second) {
        return 1;
      } else if (first > second) {
        return -1;
      }
      return 0;

    } else {
      if (first < second) {
        return -1;
      } else if (first > second) {
        return 1;
      }
      return 0;
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
