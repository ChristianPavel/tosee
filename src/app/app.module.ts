import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { NotesEntityDetailComponent } from './notes-entity-detail/notes-entity-detail.component';
import {RouterLink, RouterOutlet} from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import {AppRoutingModule} from "./app-routing.module";
import { NoteGeneratorComponent } from './note-generator/note-generator.component';
import { NotesListPendingComponent } from './notes-list-pending/notes-list-pending.component';
import { NotesListFinishedComponent } from './notes-list-finished/notes-list-finished.component';



@NgModule({
  declarations: [
    AppComponent,
    NotesListComponent,
    NotesEntityDetailComponent,
    DashboardComponent,
    NoteGeneratorComponent,
    NotesListPendingComponent,
    NotesListFinishedComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterOutlet,
    RouterLink,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
