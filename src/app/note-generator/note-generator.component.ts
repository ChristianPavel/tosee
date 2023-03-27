import {Component, Inject, OnInit} from '@angular/core';




import {NoteService} from "../note.service";
import {Location} from "@angular/common";
import {FormControl} from "@angular/forms";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";



@Component({
  selector: 'app-note-generator',
  templateUrl: './note-generator.component.html',
  styleUrls: ['./note-generator.component.css']
})
export class NoteGeneratorComponent implements OnInit{
  constructor(private _adapter: DateAdapter<any>,
              @Inject(MAT_DATE_LOCALE) private _locale: string, private location: Location, private noteService: NoteService) {
  }

  currentDate: Date = new Date();

  displayedDate: FormControl = new FormControl(new Date(""));

  currentDateString: string = "";

  dueDate: string = "";

  ngOnInit(){
    this._adapter.setLocale('fr');
  }

  clearDueDate(): void {
    this.currentDateString = "";
      this.displayedDate = new FormControl(new Date(""));
  }

    prepareSelectedDate(event: { value: Date; }): void {
      this.currentDate = event.value;
      const placeholer: Date = this.currentDate;
    this.currentDateString = placeholer.toLocaleDateString();
  }

  createNote(name: string, description: string): void {
    name = name.trim();
    if (!name) {return}
    if (this.currentDateString !== ""){const dateComponents: string[] = this.currentDateString.split(".");
      for (let i = 0; i < 2; i++){
        if (dateComponents[i].length === 1){
          dateComponents[i] = "0" + dateComponents[i]
        }
      }
      this.dueDate = dateComponents[2] + "-" + dateComponents[1] + "-" + dateComponents[0];
    }

    this.noteService.addNote(name, description, this.dueDate).subscribe( () => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}



