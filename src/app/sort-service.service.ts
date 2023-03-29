import { Injectable } from '@angular/core';
import {Note} from "./model/note";
import {MatSort} from "@angular/material/sort";

@Injectable({
  providedIn: 'root'
})
export class SortService {

  constructor() { }
  sortData(){
    return (items: Note[], sort: MatSort): Note[] => {
      if (!sort.active || sort.direction === '') {
        return items;
      }
      return items.sort((a: Note, b: Note) => {

        let comparatorResult = 0;
        let order = false;
        if (sort.direction == 'desc'){
          order = true;
        }
        switch (sort.active) {
          case 'name':
            comparatorResult = this.sortText(a.name, b.name, order);
            break;
          case 'description':
            comparatorResult = this.sortText(a.description, b.description, order);
            break;
          case 'created':
            comparatorResult = this.sortDates(a.created, b.created, order);
            break;
          case 'dueDate':
            comparatorResult = this.sortDates(a.dueDate, b.dueDate, order);
            break;
          case 'finished':
            comparatorResult = this.sortDates(a.finished, b.finished, !order);

            break;
          default:
            comparatorResult = a.name.localeCompare(b.name);
            break;
        }
        return comparatorResult;
      });
    };
  }
  sortText(a: string, b: string, reverse: boolean) {
    if (a === "" && b === ""){
      return 0;
    } else  if (a === ""){
      return 1;
    } else  if (b === ""){
      return -1;
    } else {
      if (reverse){
        return b.toLowerCase().localeCompare(a.toLowerCase());
      } else {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      }
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
    if (reverse){
      return second.toLowerCase().localeCompare(first.toLowerCase());
    } else {
      return first.toLowerCase().localeCompare(second.toLowerCase());
    }
  }
}
