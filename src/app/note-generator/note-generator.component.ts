import { Component } from '@angular/core';
import { Note } from "../model/note";
import {NoteService} from "../note.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-note-generator',
  templateUrl: './note-generator.component.html',
  styleUrls: ['./note-generator.component.css']
})
export class NoteGeneratorComponent {
  constructor(private location: Location, private noteService: NoteService) {
  }

  createNote(name: string, description: string, dueDate: string): void {
    name = name.trim();
    if (!name) {return}
    this.noteService.addNote(name, description, dueDate).subscribe( () => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
