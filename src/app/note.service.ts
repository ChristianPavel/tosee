import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Note} from "./model/note";
import {environment} from "../environments/environment";
import {TransferNote} from "./model/transferNote";

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notesUrl = new URL('http://localhost:8080/notes')

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Basic ' + btoa('user:password')
    })

  };

  constructor(private http: HttpClient) {


  }

   changeStatus(note: Note): Observable<Note> {
     const transferNote: TransferNote = {
       id: note.id,
       name: note.name,
     }
    return this.http.patch<Note>(`${environment.api}`, transferNote, this.httpOptions)
   }
  //
   update(note: Note, id: number): Observable<Note> {
      const transferNote: TransferNote = {
        id: note.id,
        name: note.name,
        description: note.description,
        comments: note.comments,
        done: note.done,
        dueDate: note.dueDate
      }
      return this.http.patch<Note>(`${environment.api}/info/${id}`, transferNote, this.httpOptions)
   }
  //
   addNote(name: string, description: string, dueDate: string): Observable<Note> {
    const transferNote: TransferNote = {
      name: name,
      description: description,
      dueDate: dueDate
    }
    return this.http.post<Note>(`${environment.api}`, transferNote, this.httpOptions)
   }

   deleteNote(id: number): Observable<Note>{
      return this.http.delete<Note>(`${environment.api}/info/${id}`, this.httpOptions)
   }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${environment.api}`, this.httpOptions);
  }

   getNote(id: number): Observable<Note> {
      return this.http.get<Note>(`${environment.api}/info/${id}`, this.httpOptions)
   }

  getPendingNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${environment.api}/pending`, this.httpOptions);
  }

  getFinishedNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${environment.api}/finished`, this.httpOptions);
  }

}


