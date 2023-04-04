import {Component, Inject, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

import {Note} from "../model/note";
import {NoteService} from "../note.service";
import {FormControl} from "@angular/forms";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";
import {Observable} from "rxjs";
import {DialogDeleteConfirm} from "../dialog-delete-confirm/dialog-delete-confirm.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-notes-entity-detail',
  templateUrl: './notes-entity-detail.component.html',
  styleUrls: ['./notes-entity-detail.component.css']
})
export class NotesEntityDetailComponent implements OnInit {
  note?: Note;

  currentDate: Date = new Date();
  displayedDate: FormControl = new FormControl(new Date(""));

  currentDateString: string = "";

  constructor(private _adapter: DateAdapter<any>,
              @Inject(MAT_DATE_LOCALE) private _locale: string,
              private location: Location,
              private activatedRoute: ActivatedRoute,
              private noteService: NoteService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getNote();
    this._adapter.setLocale('fr');
  }

  getNote(): void {
    const id = Number((this.activatedRoute.snapshot.paramMap.get('id')));
    this.noteService.getSpecificNote(id).subscribe(note => {
      this.note = note
      this.setCalenderDueDate();
    });
  }

  changeNoteStatus() {
    if (this.note)
      this.note.done = !this.note.done;
  }

  deleteNote(): void {
    if (this.note) {
      const id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
      this.noteService.deleteNote(id).subscribe(() => this.goBack());
    }

  }

  goBack(): void {
    this.location.back();
  }

  clearDueDate(): void {
    if (this.note) {
      this.displayedDate = new FormControl(new Date(""));
      this.note.dueDate = "";
    }

  }

  setCalenderDueDate(): void {
    if (this.note) {
      if (this.note.dueDate === null) {
        this.currentDate = new Date("");
        this.displayedDate = new FormControl(new Date(""));
      } else {
        this.currentDate = new Date(this.note.dueDate);
        this.displayedDate = new FormControl(this.currentDate);
      }
    }
  }

  prepareSelectedDate(event: { value: Date; }): void {
    this.currentDate = event.value;
    const placeholer: Date = this.currentDate;
    this.currentDateString = placeholer.toLocaleDateString();
  }

  update(): void {
    if (this.note) {

      if (this.currentDateString !== "") {
        const dateComponents = this.currentDateString.split(".");
        for (let i = 0; i < 2; i++) {
          if (dateComponents[i].length === 1) {
            dateComponents[i] = "0" + dateComponents[i]
          }
        }
        this.note.dueDate = dateComponents[2] + "-" + dateComponents[1] + "-" + dateComponents[0];
      }
      const id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
      this.noteService.updateNote(this.note, id)
        .subscribe(() => this.goBack());
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DialogDeleteConfirm, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        message: 'Are you sure you want to delete?',
        buttonText: {
          ok: 'Delete',
          cancel: 'No'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteNote();
      }
    });

  }

}
