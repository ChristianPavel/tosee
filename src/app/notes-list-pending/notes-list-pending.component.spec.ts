import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesListPendingComponent } from './notes-list-pending.component';

describe('NotesListPendingComponent', () => {
  let component: NotesListPendingComponent;
  let fixture: ComponentFixture<NotesListPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesListPendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesListPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
