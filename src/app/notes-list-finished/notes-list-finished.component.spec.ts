import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesListFinishedComponent } from './notes-list-finished.component';

describe('NotesListFinishedComponent', () => {
  let component: NotesListFinishedComponent;
  let fixture: ComponentFixture<NotesListFinishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesListFinishedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesListFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
