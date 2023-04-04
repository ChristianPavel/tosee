import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Note} from "../model/note";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {DialogDeleteConfirm} from "../dialog-delete-confirm/dialog-delete-confirm.component";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {SortService} from "../sort-service.service";

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
              private sortService: SortService,
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
    this.tableData.sortData = this.sortService.sortData();
    this.tableData.sort = this.sort;
  }

  changeNoteStatus(note: Note): void {
    this.toggleDone.emit(note);
  }

  deleteNote(note: Note): void {
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
        this.deleteNote(note);
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

}
