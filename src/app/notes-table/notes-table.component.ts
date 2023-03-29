import {

  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Note} from "../model/note";
import {MatTableDataSource} from "@angular/material/table";
import {NoteService} from "../note.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogDeleteConfirm} from "../dialog-delete-confirm/dialog-delete-confirm.component";

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

  constructor(protected noteService: NoteService,
              public dialog: MatDialog,
              ) {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pagination(): void {
    this.tableData.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {


    this.tableData = new MatTableDataSource(this.notes);
    this.pagination();
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

}
