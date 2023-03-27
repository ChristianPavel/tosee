import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit, Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Note} from "../model/note";
import {MatTableDataSource} from "@angular/material/table";
import {NoteService} from "../note.service";
import {MatPaginator} from "@angular/material/paginator";

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

  displayedColumns: string [] = ['name', 'description', 'created', 'dueDate', 'done', 'delete']

  constructor(protected noteService: NoteService) {
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
}
