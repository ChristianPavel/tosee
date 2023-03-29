import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Note} from "../model/note";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {DialogDeleteConfirm} from "../dialog-delete-confirm/dialog-delete-confirm.component";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";

@Component({
  selector: 'app-notes-table',
  templateUrl: './notes-table.component.html',
  styleUrls: ['./notes-table.component.css']
})
export class NotesTableComponent implements OnChanges {
  @Input() notes: Note[] = [];
  @Output() toggleDone = new EventEmitter<Note>();
  @Output() deleteClicked = new EventEmitter<Note>();

  tableData = new MatTableDataSource<Note>();

  displayedColumns: string [] = ['name', 'description', 'created', 'dueDate', 'finished', 'done', 'delete']

  constructor(public dialog: MatDialog,
              private _liveAnnouncer: LiveAnnouncer,
              ) {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort

  pagination(): void {
    this.tableData.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {


    this.tableData = new MatTableDataSource(this.notes);
    this.pagination();
    this.tableData.sortData = this.sortData()
    this.tableData.sort = this.sort;
  }

  changeStatus(note: Note): void {
    this.toggleDone.emit(note);
  }

  delete(note: Note): void {
    this.deleteClicked.emit(note);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, note: Note): void {
    const dialogRef = this.dialog.open(DialogDeleteConfirm, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data:{
        message: 'Are you sure you want to delete?',
        buttonText: {
          ok: 'Delete',
          cancel: 'No'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.delete(note);
      }
    });
  }

  annonceSortChange(event: Sort) {
    if (event.direction) {
      this._liveAnnouncer.announce(`Sorted ${event.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  // custom sort function
  sortData() {
    return (items: Note[], sort: MatSort): Note[] => {
      if (!sort.active || sort.direction === '') {
        return items;
      }
      return items.sort((a: Note, b: Note) => {
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
    };
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

}
