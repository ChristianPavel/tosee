import { NgModule } from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import { NotesListComponent} from "./notes-list/notes-list.component";
import { DashboardComponent} from "./dashboard/dashboard.component";
import { NotesEntityDetailComponent} from "./notes-entity-detail/notes-entity-detail.component";
import { NoteGeneratorComponent} from "./note-generator/note-generator.component";
import { NotesListFinishedComponent} from "./notes-list-finished/notes-list-finished.component";
import { NotesListPendingComponent} from "./notes-list-pending/notes-list-pending.component";

const routes: Routes = [

  {path: 'notes/info/:id', component: NotesEntityDetailComponent},
  {path: 'notes/create', component: NoteGeneratorComponent},
  {path: 'notes/finished', component: NotesListFinishedComponent},
  {path: 'notes/pending', component: NotesListPendingComponent},
  { path: 'notes', component: NotesListComponent},
  {path: 'dashboard', component: DashboardComponent},

  {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
